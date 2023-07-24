import { h } from "preact";
import InputBox from "./components/InputBox";
import TaskList from "./components/TaskList";

export function App(props: any) {
    return (
        <>
            <div id="App" class="flex flex-col justify-center items-center">
                <InputBox />
                <TaskList />
            </div>
        </>
    );
}
