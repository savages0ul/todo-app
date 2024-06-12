import { observer } from 'mobx-react-lite';
import { ConfirmDialog } from 'primereact/confirmdialog';

import { Footer } from './footer';
import styles from './styles.module.scss';
import { TodoInput } from './todoInput';
import { TodoList } from './todoList';

const TodoApp = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <ConfirmDialog className={styles.dialog} />
                <span className={styles.title}>todos</span>
                <TodoInput />
                <TodoList />
            </div>
            <Footer />
        </div>
    );
};

export default observer(TodoApp);
