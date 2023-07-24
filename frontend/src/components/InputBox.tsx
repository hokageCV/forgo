import { h } from "preact";
import { useState } from "preact/hooks";
import { CreateTask } from "../../wailsjs/go/main/App";

const initialFormState = {
    title: "",
    remindtime: "",
    iscompleted: false,
    isrecurring: false,
    frequency: "",
};

const InputBox = () => {
    const [formData, setFormData] = useState(initialFormState);
    const [error, setError] = useState<string>("");
    const [submittedData, setSubmittedData] = useState<any>(null);

    const handleChange = (e: any) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevFormData) => {
            return {
                ...prevFormData,
                [name]: type === "checkbox" ? checked : value,
            };
        });
    };

    const handleSubmit = (e: any) => {
        e.preventDefault();
        if (!formData.title || !formData.remindtime) {
            setError("Please fill all the fields");
            return;
        }

        setSubmittedData(formData);
        const remindTime = new Date(formData.remindtime);

        CreateTask(
            formData.title,
            remindTime.toISOString(),
            formData.isrecurring,
            formData.frequency
        );
        setError("");
        setFormData(initialFormState);
    };

    return (
        <div class="w-8/12 p-4 bg-night-3 text-snow-4 rounded-lg shadow-lg">
            <h2 class="text-xl font-semibold mb-4">Task Details</h2>

            <div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">Title</label>
                    <input
                        type="text"
                        placeholder="Type here"
                        required
                        className="input input-bordered w-full max-w-xs"
                        name="title"
                        onChange={handleChange}
                        value={formData.title}
                    />
                </div>
                <div className="form-control w-full max-w-xs">
                    <label className="label">Remind Time</label>
                    <input
                        type="datetime-local"
                        placeholder="Type here"
                        required
                        className="input input-bordered w-full max-w-xs"
                        name="remindtime"
                        onChange={handleChange}
                        value={formData.remindtime}
                    />
                </div>
                <div className="form-control w-52">
                    <label className="cursor-pointer label">
                        <span className="label-text">Recurring </span>
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
                        <label className="label">Frequency</label>
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
                <button className="btn btn-active btn-accent" onClick={handleSubmit} type="submit">
                    Submit
                </button>
                {error && (
                    <div className="alert alert-error max-w-max ">
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
                        <span>{error}</span>
                    </div>
                )}
            </div>
            {submittedData && <p>You submitted: {JSON.stringify(submittedData)}</p>}
        </div>
    );
};

export default InputBox;
