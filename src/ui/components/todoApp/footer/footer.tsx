import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';

import { useStores } from '../../../../control';
import styles from './styles.module.scss';

const Footer = () => {
    const { todo } = useStores();
    const { todoList } = todo;
    const {
        completedRecords,
        updateAllMode,
        updateCompletedMode,
        updateActiveMode,
        activeRecords,
        clearCompletedRecords,
        allMode,
        activeMode,
        completedMode,
    } = todoList;
    return (
        <div className={styles.container}>
            <div className={styles.text}>{activeRecords.length} items left</div>
            <div className={styles.wrapper}>
                <Button
                    label="All"
                    onClick={updateAllMode}
                    text={!allMode}
                    severity="help"
                    className={styles.button}
                />
                <Button
                    label="Active"
                    onClick={updateActiveMode}
                    text={!activeMode}
                    severity="help"
                    className={styles.button}
                />
                <Button
                    label="Completed"
                    onClick={updateCompletedMode}
                    text={!completedMode}
                    severity="help"
                    className={styles.button}
                />
            </div>
            <Button
                label="Clear completed"
                onClick={clearCompletedRecords}
                disabled={!completedRecords.length}
                severity="danger"
                className={styles.clearButton}
            />
        </div>
    );
};

export default observer(Footer);
