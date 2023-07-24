import { useState } from "preact/hooks";
import { TaskType } from "../types";

const useTaskList = () => {
    const [taskList, setTaskList] = useState([] as TaskType[]);

    const addTask = (task: TaskType) => setTaskList([...taskList, task]);

    const updateTask = (id: string, updatedTask: TaskType) => {
        setTaskList((prevTasks) => prevTasks.map((task) => (task.id === id ? updatedTask : task)));
    };

    const removeTask = (id: string) => {
        const newTaskList = taskList.filter((task) => task.id !== id);
        setTaskList(newTaskList);
    };

    return { taskList, addTask, updateTask, removeTask };
};

export default useTaskList;
