import { makeObservable, observable } from 'mobx';

import { TTodo, TTodoItem } from './types';

class TodoItem {
    id: string;

    @observable
    title: string;

    @observable
    isCompleted: boolean;

    toggleCompletedCallback!: (item: TTodoItem) => void;

    constructor(
        item: TTodo,
        toggleCompletedCallback: (item: TTodoItem) => void
    ) {
        this.id = item.id;
        this.title = item.title;
        this.isCompleted = item.isCompleted;
        this.toggleCompletedCallback = toggleCompletedCallback;

        makeObservable(this);
    }

    toggleComplete = () => {
        this.toggleCompletedCallback(this);
    };
}

export default TodoItem;
