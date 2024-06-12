import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { confirmDialog } from 'primereact/confirmdialog';
import { classNames } from 'primereact/utils';

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
        allRecords,
    } = todoList;

    const confirmDeleteCompletedItems = () => {
        confirmDialog({
            message: 'Are you sure you want to delete completed items?',
            header: 'Confirm deletion',
            icon: 'pi pi-info-circle',
            acceptClassName: 'p-button-danger',
            accept: clearCompletedRecords,
            reject: () => {},
        });
    };

    return (
        <div className={styles.container}>
            <div className={styles.text}>{activeRecords.length} items left</div>
            <div className={styles.wrapper}>
                <Button
                    label="All"
                    onClick={updateAllMode}
                    severity="help"
                    className={classNames(styles.button, styles.allButton)}
                    outlined={!allMode}
                    badge={
                        (allRecords.length && allRecords.length.toString()) ||
                        ''
                    }
                    badgeClassName="p-badge-danger"
                />
                <Button
                    label="Active"
                    onClick={updateActiveMode}
                    severity="help"
                    className={classNames(styles.button, styles.activeButton)}
                    outlined={!activeMode}
                    badge={
                        (activeRecords.length &&
                            activeRecords.length.toString()) ||
                        ''
                    }
                    badgeClassName="p-badge-danger"
                />
                <Button
                    label="Completed"
                    onClick={updateCompletedMode}
                    severity="help"
                    className={classNames(
                        styles.button,
                        styles.completedButton
                    )}
                    outlined={!completedMode}
                    badge={
                        (completedRecords.length &&
                            completedRecords.length.toString()) ||
                        ''
                    }
                    badgeClassName="p-badge-danger"
                />
            </div>
            <Button
                label="Clear completed"
                onClick={confirmDeleteCompletedItems}
                disabled={!completedRecords.length}
                severity="danger"
                className={styles.button}
                icon="pi pi-trash"
            />
        </div>
    );
};

export default observer(Footer);
