import React from 'react';
import './Col.css';

function Col({ length, handleClick, x, y, grid }) {
    let background = "white"
    for (let i = 0; i < grid.length; i++) {
        if (grid[i].x === x && grid[i].y === y) {
            if (grid[i].type === "startPoint") {
                background = "green"
            } else if (grid[i].type === "endPoint") {
                background = "red"
            } else if (grid[i].type === "wall") {
                background = "gray"
            } else if (grid[i].type === "path") {
                background = "gold"
            }
        }
    }
    return (
        <div className="col" style={{ width: length, height: length, background }} onClick={handleClick} />
    )
}

export default Col;