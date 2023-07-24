import { useState } from "preact/hooks";
import { h } from "preact";
import InputBox from "./components/InputBox";
import { TaskType } from "./types";
import TaskList from "./components/TaskList";

export function App(props: any) {
    const [taskList, setTaskList] = useState([] as TaskType[]);

    return (
        <>
            <div id="App" class="flex flex-col justify-center items-center">
                <InputBox />
                <TaskList taskList={taskList} />
            </div>
        </>
    );
}
