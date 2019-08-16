import React from 'react';
import "./Interface.css"

function Interface({ list, clearPoints, start, chooseAlgo, changeAlgo, clearPath }) {
    return (
        <div className="interface">
            {
                list.map((value, index) => (
                    <React.Fragment key={index}>
                        {
                            chooseAlgo === value.name ?
                                <input type="radio" onChange={changeAlgo(value.name)} name="algo" value={value.name} checked /> :
                                <input type="radio" onChange={changeAlgo(value.name)} name="algo" value={value.name} />
                        }
                        <label>{value.name}</label>
                        <br />
                    </React.Fragment>

                ))
            }
            <button onClick={start}>Start</button>
            <button onClick={clearPoints}>Wyczyść</button>
            <br></br>
            <button onClick={clearPath}>Wyczyść ściezke </button>
        </div>
    );
}

export default Interface;
