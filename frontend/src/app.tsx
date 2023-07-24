import { useState } from "preact/hooks";
import { h } from "preact";
import InputBox from "./components/InputBox";

export function App(props: any) {
    return (
        <>
            <div id="App" class="flex flex-col justify-center items-center">
                <InputBox />
            </div>
        </>
    );
}
