import React, { useState } from 'react';
import './dice.css';

const Die = (props) => {
    const numberWords = ["one", "two", "three", "four", "five", "six"];
    let classs = `dice fas fa-dice-${numberWords[props.val - 1]} fa-5x `;
    if (props.locked) classs += "dice-locked ";
    return (
        <i
            className={classs}
            onClick={() => props.handleClick(props.idx)}  >
        </i>
    )
}

export default Die;