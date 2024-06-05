import { expect, it, vi } from 'vitest';

import { fireEvent, render, screen } from '@testing-library/react';

import { TTodoItem } from '../../../../../control/stores/todo/types';
import TodoItem from './todoItem';

it('TodoItem должен переключить состояние завершения', () => {
    const item: TTodoItem = {
        id: '1',
        title: 'Test Todo',
        isCompleted: false,
        toggleComplete: vi.fn(),
    };

    render(<TodoItem item={item} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(item.toggleComplete).toHaveBeenCalled();
});
