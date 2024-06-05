import { observer } from 'mobx-react-lite';
import { classNames } from 'primereact/utils';

import { useStores } from '../../../../control';
import { TTodoItem } from '../../../../control/stores/todo/types';
import styles from './styles.module.scss';
import { TodoItem } from './todoItem';

const TodoList = () => {
    const { todo } = useStores();
    const { todoList } = todo;
    const {
        allRecords,
        completedRecords,
        activeRecords,
        allMode,
        completedMode,
        activeMode,
    } = todoList;

    const getRecords = () => {
        if (allMode) return allRecords;
        if (completedMode) return completedRecords;
        if (activeMode) return activeRecords;
    };

    const records = getRecords();

    return (
        <div
            className={classNames(styles.root, {
                [styles.pr]: records && records.length > 5,
            })}
        >
            <div className={styles.container}>
                {records?.map((item: TTodoItem) => (
                    <TodoItem key={item.id} item={item} />
                ))}
                {allMode && !allRecords.length && (
                    <div className={styles.wrapper}>No todos</div>
                )}
                {activeMode && !activeRecords.length && (
                    <div className={styles.wrapper}>No todos active</div>
                )}
                {completedMode && !completedRecords.length && (
                    <div className={styles.wrapper}>No todos completed</div>
                )}
            </div>
        </div>
    );
};

export default observer(TodoList);
