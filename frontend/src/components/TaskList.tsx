import { TaskType } from "../types";
import { h } from "preact";
import Task from "./Task";

type TaskListProps = {
    taskList: TaskType[];
};

export default function TaskList({ taskList }: TaskListProps) {
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
