import { Task } from "../types";
import { h } from "preact";

type TaskProps = {
    task: Task;
};

export default function Task({ task }: TaskProps) {
    return (
        <div className="card w-10/12 bg-night-3 shadow-xl">
            <div className="card-body">
                <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
                <p className="mb-2">Remind Time: {task.remindtime}</p>
                <p className="mb-2">Is Completed: {task.iscompleted ? "Yes" : "No"}</p>
                {task.isrecurring && (
                    <p className="mb-2">Is Recurring: {task.isrecurring ? "Yes" : "No"}</p>
                )}
                {task.isrecurring && <p>Frequency: {task.frequency}</p>}
            </div>
        </div>
    );
}
