import React, { useState } from 'react';

import { observer } from 'mobx-react-lite';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';

import { useStores } from '../../../../control';
import styles from './styles.module.scss';

const TodoInput = () => {
    const [value, setValue] = useState<string>('');
    const { todo } = useStores();
    const { todoList } = todo;
    const { createRecord } = todoList;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (value.trim()) {
            createRecord(value);
            setValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="card flex justify-content-center gap-3 w-full">
                <InputText
                    value={value}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setValue(e.target.value)
                    }
                    className={styles.input}
                    placeholder="What needs to be done?"
                />
                <Button
                    type="submit"
                    label="Add"
                    disabled={!value.trim()}
                    severity="success"
                    icon="pi pi-plus"
                />
            </div>
        </form>
    );
};

export default observer(TodoInput);
