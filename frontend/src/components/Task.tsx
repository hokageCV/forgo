import { TaskType } from "../types";
import { h } from "preact";
import { useTaskContextProvider } from "../context/taskContext";
import { DeleteTask } from "../../wailsjs/go/main/App";
import { useFormatedDate } from "../hooks/date";

type TaskProps = {
    task: TaskType;
};

export default function Task({ task }: TaskProps) {
    const { removeTask } = useTaskContextProvider();
    const { formattedDate, formattedTime } = useFormatedDate(task.remindtime);

    const handleDelete = async () => {
        try {
            await DeleteTask(task.id);
            removeTask(task.id);
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    return (
        <div className="card w-64 h-32 bg-night-4 rounded-md shadow-xl shadow-night-5 p-4">
            <button
                className="absolute top-2 right-2 text-flame hover:text-grape transition-all"
                onClick={handleDelete}
            >
                <DeleteSVG />
            </button>
            <h2 className="text-xl font-semibold mb-2">{task.title}</h2>
            <div className="flex flex-row justify-evenly items-center">
                <p className="flex flex-row justify-center items-center text-base mb-2">
                    <CalendarSVG /> &nbsp; {formattedDate}
                </p>
                <p className="flex flex-row justify-center items-center text-base mb-2">
                    <ClockSVG /> &nbsp; {formattedTime}
                </p>
            </div>

            {task.isrecurring && (
                <p className="flex flex-row justify-center items-center text-base mb-2">
                    <RepeatSVG /> &nbsp; {task.frequency}
                </p>
            )}
        </div>
    );
}

const DeleteSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
        />
    </svg>
);

const ClockSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-clock"
        className="h-5 w-5"
    >
        <circle cx="12" cy="12" r="10"></circle>
        <polyline points="12 6 12 12 16 14"></polyline>
    </svg>
);

const CalendarSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="feather feather-calendar"
        className="h-5 w-5"
    >
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="16" y1="2" x2="16" y2="6"></line>
        <line x1="8" y1="2" x2="8" y2="6"></line>
        <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
);

const RepeatSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
    >
        <polyline points="17 1 21 5 17 9"></polyline>
        <path d="M3 11V9a4 4 0 0 1 4-4h14"></path>
        <polyline points="7 23 3 19 7 15"></polyline>
        <path d="M21 13v2a4 4 0 0 1-4 4H3"></path>
    </svg>
);
