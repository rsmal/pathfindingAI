import React from 'react';
import "./Interface.css"

function Interface({ list }) {
    return (
        <div className="interface">
            {
                list.map((value, index) => (
                    <h4 key={index}>{value.name}</h4>
                ))
            }
        </div>
    );
}

export default Interface;
