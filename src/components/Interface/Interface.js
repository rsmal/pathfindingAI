import React from 'react';
import "./Interface.css"

function Interface({ list, clearPoints }) {
    return (
        <div className="interface">
            {
                list.map((value, index) => (
                    <h4 key={index}>{value.name}</h4>
                ))
            }
            <button onClick={clearPoints}>Wyczyść</button>
        </div>
    );
}

export default Interface;
