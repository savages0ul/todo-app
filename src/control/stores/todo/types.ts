export type TTodo = {
    id: string;
    title: string;
    isCompleted: boolean;
};

export type TTodoItem = TTodo & {
    toggleComplete(): void;
};
