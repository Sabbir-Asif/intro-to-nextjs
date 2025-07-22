export interface Task {
    name: string;
    status: 'pending' | 'done' | 'todo';
}

export const tasks: Task[] = [
    {
        name: "Initialize app",
        status: "done"
    },
    {
        name: "Set up routes",
        status: "pending"
    },
    {
        name: "Add Auth",
        status: "todo"
    }
]