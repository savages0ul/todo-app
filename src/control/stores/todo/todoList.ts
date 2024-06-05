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

    constructor() {
        makeObservable(this);
    }

    @action
    toggleCompleted = (item: TTodoItem) => {
        const index = this.allRecords.findIndex(
            (_item) => _item.id === item.id
        );

        if (index < 0) return;

        this.allRecords[index].isCompleted =
            !this.allRecords[index].isCompleted;

        this.completedRecords = this.allRecords.filter(
            (item) => item.isCompleted
        );

        this.activeRecords = this.allRecords.filter(
            (item) => !item.isCompleted
        );
    };

    clearCompletedRecords = () => {
        const notCompleted = this.allRecords.filter(
            (item) => !item.isCompleted
        );
        this.updateAllRecords(notCompleted);
        this.updateCompletedRecords([]);
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
        this.activeRecords.push(newItem);
    };

    @action
    updateAllRecords = (records: TTodoItem[]) => {
        this.allRecords = records;
    };

    @action
    updateCompletedRecords = (records: TTodoItem[]) => {
        this.completedRecords = records;
    };

    @action
    updateAllMode = () => {
        this.allMode = true;
        this.completedMode = false;
        this.activeMode = false;
    };

    @action
    updateCompletedMode = () => {
        this.allMode = false;
        this.completedMode = true;
        this.activeMode = false;
    };

    @action
    updateActiveMode = () => {
        this.allMode = false;
        this.completedMode = false;
        this.activeMode = true;
    };
}

export default TodoList;
