import { useContext } from "preact/hooks";
import { createContext } from "preact";
import { h, FunctionComponent } from "preact";
import { TaskStoreType } from "../types";
import useTaskList from "../hooks/useTaskList";

export const TaskContext = createContext({} as TaskStoreType);

export const TaskProvider: FunctionComponent = ({ children }) => {
    const { taskList, addTask, updateTask, removeTask } = useTaskList();

    return (
        <TaskContext.Provider value={{ taskList, addTask, updateTask, removeTask }}>
            {children}
        </TaskContext.Provider>
    );
};

// using this, we won't need to provide context all the time
export const useTaskContextProvider = () => {
    return useContext(TaskContext);
};
