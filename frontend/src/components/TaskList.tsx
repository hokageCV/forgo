import { h } from "preact";
import Task from "./Task";
import { useTaskContextProvider } from "../context/taskContext";
import { GetAllTasks } from "../../wailsjs/go/main/App";
import { useEffect } from "preact/hooks";

export default function TaskList() {
    const { taskList, setTaskList } = useTaskContextProvider();

    useEffect(() => {
        GetAllTasks().then((tasks) => {
            setTaskList(tasks);
        });
    }, []);

    return (
        <div class="flex flex-wrap justify-center items-center gap-6 w-shell bg-night-3 rounded-md p-6 m-5 border-2 border-night-5 ">
            {taskList.length > 0 ? (
                taskList.map((task) => <Task key={task.id} task={task} />)
            ) : (
                <p className="text-flame font-bold p-3 rounded-md text-lg">No tasks</p>
            )}
        </div>
    );
}
