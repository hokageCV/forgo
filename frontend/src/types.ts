export type TaskType = {
    id: string;
    title: string;
    reminddate: string;
    remindtime: string;
    iscompleted: boolean;
    isrecurring: boolean;
    frequency?: string;
};

export type TaskStoreType = {
    taskList: TaskType[];
    addTask: (task: TaskType) => void;
    updateTask: (id: string, updatedTask: TaskType) => void;
    removeTask: (id: string) => void;
};
