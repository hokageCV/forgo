export type TaskType = {
    id: string;
    title: string;
    remindtime: string;
    iscompleted: boolean;
    isrecurring: boolean;
    frequency?: string;
};
