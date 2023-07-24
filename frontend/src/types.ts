export type Task = {
    id: string;
    title: string;
    remindtime: string;
    iscompleted: boolean;
    isrecurring: boolean;
    frequency?: string;
};
