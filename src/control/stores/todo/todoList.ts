import { action, makeObservable, observable } from 'mobx';
import { v4 } from 'uuid';

import TodoItem from './todoItem';
import { TTodoItem } from './types';

class TodoList {
    @observable
    allRecords: TTodoItem[] = [];

    @observable
    completedRecords: TTodoItem[] = [];

    @observable
    activeRecords: TTodoItem[] = [];

    @observable
    allMode: boolean = true;
    @observable
    completedMode: boolean = false;
    @observable
    activeMode: boolean = false;

    localStorageKey = 'todoList';

    constructor() {
        makeObservable(this);
        this.loadFromLocalStorage();
    }

    loadFromLocalStorage() {
        const storedData = localStorage.getItem(this.localStorageKey);
        if (storedData) {
            const {
                allRecords,
                completedRecords,
                activeRecords,
                allMode,
                completedMode,
                activeMode,
            } = JSON.parse(storedData);
            this.allRecords = allRecords.map(
                (item: TTodoItem) => new TodoItem(item, this.toggleCompleted)
            );
            this.completedRecords = completedRecords.map(
                (item: TTodoItem) => new TodoItem(item, this.toggleCompleted)
            );
            this.activeRecords = activeRecords.map(
                (item: TTodoItem) => new TodoItem(item, this.toggleCompleted)
            );
            this.allMode = allMode;
            this.completedMode = completedMode;
            this.activeMode = activeMode;
        }
    }

    saveToLocalStorage() {
        const dataToStore = {
            allRecords: this.allRecords.map((item) => ({
                id: item.id,
                title: item.title,
                isCompleted: item.isCompleted,
            })),
            completedRecords: this.completedRecords.map((item) => ({
                id: item.id,
                title: item.title,
                isCompleted: item.isCompleted,
            })),
            activeRecords: this.activeRecords.map((item) => ({
                id: item.id,
                title: item.title,
                isCompleted: item.isCompleted,
            })),
            allMode: this.allMode,
            completedMode: this.completedMode,
            activeMode: this.activeMode,
        };
        localStorage.setItem(this.localStorageKey, JSON.stringify(dataToStore));
    }

    @action
    toggleCompleted = (item: TTodoItem) => {
        const index = this.allRecords.findIndex(
            (_item) => _item.id === item.id
        );

        if (index < 0) return;

        this.allRecords[index].isCompleted =
            !this.allRecords[index].isCompleted;

        this.updateCompletedRecords(
            this.allRecords.filter((item) => item.isCompleted)
        );
        this.updateActiveRecords(
            this.allRecords.filter((item) => !item.isCompleted)
        );

        this.saveToLocalStorage();
    };

    clearCompletedRecords = () => {
        const notCompleted = this.allRecords.filter(
            (item) => !item.isCompleted
        );
        this.updateAllRecords(notCompleted);
        this.updateCompletedRecords([]);
        this.saveToLocalStorage();
    };

    @action
    createRecord = (text: string) => {
        const newItem = new TodoItem(
            {
                id: v4(),
                title: text,
                isCompleted: false,
            },
            this.toggleCompleted
        );
        this.allRecords.push(newItem);
        if (!newItem.isCompleted) {
            this.activeRecords.push(newItem);
        }
        this.saveToLocalStorage();
    };

    @action
    updateAllRecords = (records: TTodoItem[]) => {
        this.allRecords = records;
        this.saveToLocalStorage();
    };

    @action
    updateCompletedRecords = (records: TTodoItem[]) => {
        this.completedRecords = records;
        this.saveToLocalStorage();
    };

    @action
    updateActiveRecords = (records: TTodoItem[]) => {
        this.activeRecords = records;
        this.saveToLocalStorage();
    };

    @action
    updateAllMode = () => {
        this.allMode = true;
        this.completedMode = false;
        this.activeMode = false;
        this.saveToLocalStorage();
    };

    @action
    updateCompletedMode = () => {
        this.allMode = false;
        this.completedMode = true;
        this.activeMode = false;
        this.saveToLocalStorage();
    };

    @action
    updateActiveMode = () => {
        this.allMode = false;
        this.completedMode = false;
        this.activeMode = true;
        this.saveToLocalStorage();
    };
}

export default TodoList;
