import { GetAllTasks } from "../wailsjs/go/main/App";
import { useState } from "preact/hooks";
import { h } from "preact";

export function App(props: any) {
    const [resultText, setResultText] = useState<any>("Please enter your name below 👇");
    const [name, setName] = useState("");
    const updateName = (e: any) => setName(e.target.value);

    // fetch tasks and display as result text
    function greet() {
        GetAllTasks()
            .then((tasks) => {
                setResultText(JSON.stringify(tasks)); // Convert tasks to a string for display
            })
            .catch((error) => {
                setResultText("Error fetching tasks: " + error); // Display error message if any
            });
    }

    return (
        <>
            <div id="App" className="bg-red-300">
                <h1 className="text-4xl text-green-800 tester">hey hey hey</h1>
                <div id="result" className="result">
                    {resultText}
                </div>

                <div id="input" className="input-box">
                    <input
                        id="name"
                        className="input"
                        onChange={updateName}
                        autoComplete="off"
                        name="input"
                        type="text"
                    />
                    <button className="btn" onClick={greet}>
                        Greet
                    </button>
                </div>
            </div>
        </>
    );
}
