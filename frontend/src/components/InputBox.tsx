import { h } from "preact";
import { useState, useEffect } from "preact/hooks";
import { CreateTask } from "../../wailsjs/go/main/App";
import { useTaskContextProvider } from "../context/taskContext";

const initialFormState = {
    title: "",
    reminddate: "",
    remindtime: "",
    iscompleted: false,
    isrecurring: false,
    frequency: "",
};

const InputBox = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string>("");
    const { addTask } = useTaskContextProvider();

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        if (
            !formData.title ||
            !formData.reminddate ||
            !formData.remindtime ||
            (formData.isrecurring && !formData.frequency)
        ) {
            setError("Please fill all the fields");
            return;
        }

        try {
            const createdTask = await CreateTask(
                formData.title,
                formData.reminddate,
                formData.remindtime,
                formData.isrecurring,
                formData.frequency
            );

            setError("");
            addTask(createdTask);
            setFormData(initialFormState);
        } catch (error: any) {
            setError(`Couldn't create task : ${error}`);
        }
    };

    useEffect(() => {
        if (error) {
            const timer = setTimeout(() => {
                setError("");
            }, 4 * 1000);

            return () => clearTimeout(timer);
        }
    }, [error]);

    return (
        <div class="flex flex-col justify-center items-center w-shell p-4 mt-4 bg-night-3 text-snow-4 border-2 border-night-5 rounded-lg shadow-lg">
            <h2 class="text-2xl font-semibold mb-4 text-center">Task Details</h2>

            <div class="flex flex-col justify-center items-center">
                <div className="form-control w-full max-w-xs ">
                    <label className="label pb-0 mb-0">Title</label>
                    <input
                        type="text"
                        placeholder="Enter Task"
                        required
                        className="input input-bordered w-full max-w-xs"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label pb-0 mb-0">Date</label>
                    <input
                        type="date"
                        required
                        className="input input-bordered w-full max-w-xs"
                        name="reminddate"
                        onChange={handleChange}
                        value={formData.reminddate}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label pb-0 mb-0">Time</label>
                    <input
                        type="time"
                        required
                        placeholder="Enter Time"
                        className="input input-bordered w-full max-w-xs"
                        name="remindtime"
                        onChange={handleChange}
                        value={formData.remindtime}
                        step="60"
                    />
                </div>
                <div className="form-control w-52">
                    <label className="cursor-pointer label">
                        <span className="label">Recurring </span>
                        <input
                            type="checkbox"
                            className="toggle toggle-primary"
                            name="isrecurring"
                            onChange={handleChange}
                            checked={formData.isrecurring}
                        />
                    </label>
                </div>
                {formData.isrecurring && (
                    <div className="form-control w-full max-w-xs">
                        <label className="label pb-0 mb-0">Frequency</label>
                        <select
                            className="select select-bordered w-full max-w-xs"
                            name="frequency"
                            value={formData.frequency}
                            onChange={handleChange}
                            required={formData.isrecurring}
                        >
                            <option value="">Select Frequency</option>
                            <option value="Daily">Daily</option>
                            <option value="Hourly">Hourly</option>
                        </select>
                    </div>
                )}
                <button
                    className="btn btn-active bg-soil hover:bg-grass text-lg text-night-3 m-2"
                    onClick={handleSubmit}
                    type="submit"
                >
                    Submit
                </button>
                {error && (
                    <div className="alert alert-error max-w-max ">
                        <CrossSVG />
                        <span>{error}</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default InputBox;

const CrossSVG = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
    </svg>
);
