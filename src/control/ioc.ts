import { TodoStore } from './stores/todo';

class RootStore {
    public todo = new TodoStore();

    constructor() {
        this.init();
    }

    init() {
        this.todo.init();
    }
}

const rootStoreInstance = new RootStore();

export { RootStore, rootStoreInstance };
