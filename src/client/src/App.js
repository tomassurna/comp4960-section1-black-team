import React, {useEffect, useState} from "react";
import "./App.css";

function App() {
    const [items, setItems] = useState([]);
    let name = "";

    async function fetchData() {
        const items = await (await fetch("/all")).json();

        console.log(items);
        return items;
    }

    useEffect(() => {
        fetchData().then((data) => setItems(data));
    }, items);

    return (
        <div className="App">
            <header className="App-header">
                <div>
                    <label>
                        Name:
                        <input type="text" name="name" onChange={(val) => name = val.target.value}/>
                    </label>
                    <button onClick={async () => {await fetch("addTeammate", {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json',
                        },
                        body: name
                    });
                        fetchData().then((data) => setItems(data));}}>Add Teammate
                    </button>
                </div>
                <div>
                    Teammates:
                    {items
                        .filter((item) => item.hasOwnProperty("name"))
                        .map((item) => {
                            return <li>{item.name}</li>;
                        })}
                </div>
            </header>
        </div>
    );
}

export default App;
