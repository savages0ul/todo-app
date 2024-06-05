import { observer } from 'mobx-react-lite';
import { Checkbox } from 'primereact/checkbox';
import { classNames } from 'primereact/utils';

import { TTodoItem } from '../../../../../control/stores/todo/types';
import styles from './styles.module.scss';

type TProps = {
    item: TTodoItem;
};

const TodoItem = ({ item }: TProps) => {
    return (
        <div className={styles.container}>
            <Checkbox
                onChange={() => item.toggleComplete()}
                checked={item.isCompleted}
            />
            <label
                htmlFor="title"
                className={classNames(styles.text, {
                    [styles.completed]: item.isCompleted,
                })}
            >
                {item.title}
            </label>
        </div>
    );
};

export default observer(TodoItem);
