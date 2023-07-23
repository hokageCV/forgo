import logo from "./assets/images/logo-universal.png";
import { Greet } from "../wailsjs/go/main/App";
import { useState } from "preact/hooks";
import { h } from "preact";

export function App(props: any) {
    const [resultText, setResultText] = useState("Please enter your name below 👇");
    const [name, setName] = useState("");
    const updateName = (e: any) => setName(e.target.value);
    const updateResultText = (result: string) => setResultText(result);

    function greet() {
        Greet(name).then(updateResultText);
    }

    return (
        <>
            <div id="App" className="bg-red-700">
                <h1 className="text-4xl text-green-500 tester">hey hey hey</h1>
                <div id="result" className="result">
                    {resultText}
                </div>
                <div className="card card-compact w-96 bg-base-100 shadow-xl">
                    <figure>
                        <img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">Shoes!</h2>
                        <p>If a dog chews shoes whose shoes does he choose?</p>
                        <div className="card-actions justify-end">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
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
