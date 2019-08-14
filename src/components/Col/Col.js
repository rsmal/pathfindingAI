import React from 'react';
import './Col.css';

function Col({ length, handleClick }) {
    return <div className="col" style={{ width: length, height: length }} onClick={handleClick} />;
}

export default Col;