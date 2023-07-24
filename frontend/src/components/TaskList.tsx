import { h } from "preact";
import Task from "./Task";
import { useTaskContextProvider } from "../context/taskContext";

export default function TaskList() {
    const { taskList } = useTaskContextProvider();

    return (
        <div class="flex flex-col justify-center items-center bg-frost-1 rounded-md p-4 m-5">
            {taskList.length > 0 ? (
                taskList.map((task) => <Task key={task.id} task={task} />)
            ) : (
                <p className="text-flame bg-grass p-3 rounded-md text-lg">No tasks</p>
            )}
        </div>
    );
}
