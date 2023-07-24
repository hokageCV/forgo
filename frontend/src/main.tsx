import { render } from "preact";
import { App } from "./app";
import "./style.css";
import { TaskProvider } from "./context/taskContext";

render(
    <TaskProvider>
        <App />
    </TaskProvider>,
    document.getElementById("app")!
);
