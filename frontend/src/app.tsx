import { h } from "preact";
import InputBox from "./components/InputBox";
import TaskList from "./components/TaskList";

export function App(props: any) {
    return (
        <>
            <div
                id="App"
                class="flex flex-col justify-start items-center w-full min-h-screen bg-night-1"
            >
                <InputBox />
                <TaskList />
            </div>
        </>
    );
}
