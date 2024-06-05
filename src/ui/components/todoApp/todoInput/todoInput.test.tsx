import { fireEvent, render, screen } from '@testing-library/react';

import { RootStoreProvider } from '../../../../control';
import { TodoStore } from '../../../../control/stores/todo';
import TodoInput from './todoInput';

test('TodoInput должен разрешить ввод и отправить новую задачу', () => {
    const mockTodoStore = new TodoStore();
    const mockRootStore = { todo: mockTodoStore };

    render(
        <RootStoreProvider mockStore={mockRootStore}>
            <TodoInput />
        </RootStoreProvider>
    );

    const input = screen.getByPlaceholderText('What needs to be done?');
    const button = screen.getByRole('button', { name: 'Add' });

    fireEvent.change(input, { target: { value: 'New Todo' } });
    fireEvent.click(button);

    expect(mockTodoStore.todoList.allRecords).toHaveLength(1);
    expect(mockTodoStore.todoList.allRecords[0].title).toBe('New Todo');
});
