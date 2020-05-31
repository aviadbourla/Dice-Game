import React, { useState, useEffect } from 'react';
import Dice from './Dice'
import rules from './rules';
import './dice.css';

const Board = () => {
    const [dice, setdices] = useState(Array(6).fill(null));
    const [presedDice, setPresedDice] = useState([]);
    const [locked, setLocked] = useState(Array(6).fill(false));
    const [isRoled, setisRoled] = useState(true);
    const [playerOneSum, setplayerOneSum] = useState(0);
    const [playerTwoSum, setPlayerTwoSum] = useState(0);
    const [SumBeforePass, setSumBeforePass] = useState(0);
    const [playerTurn, setplayerTurn] = useState(true);
    const [start, setStart] = useState(false);

    //upcoming 
    const [winner, setWinner] = useState(false);
    const [winneresName, setwinneresName] = useState('');
    const [unpresedDice, setUnpresedDice] = useState([]);

    useEffect(() => {
        setSumBeforePass(canculateScore());
    }, [presedDice])

    // useEffect(() => {
    //     if (dice[0] !== null) {
    //         console.log(rules.nothingStart(dice))
    //         if (rules.nothingStart(dice) === false) {
    //             alert("Notging !! changeing turns now")
    //             setplayerTurn(!playerTurn)
    //             setLocked(locked.map((locke) => !locked))
    //             setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
    //             setSumBeforePass(0);
    //         }
    //     }
    // }, [dice])

    function startgame() {
        setdices(dice.map((dice, i) => locked[i] ? dice : Math.floor(Math.random() * ((6 - 1) + 1) + 1)));
        setStart(true)
    }
    function toggleLocked(idx) {
        setLocked([...locked.slice(0, idx), !locked[idx], ...locked.slice(idx + 1)])
        if (locked[idx] === false) {
            setPresedDice([...presedDice, dice[idx]]);
        } else {
            setPresedDice(presedDice.filter(presedDice => presedDice !== dice[idx]))
        }
    }
    function canculateScore() {
        let temp = 0;
        let ThreeOfAkindObject = rules.threeOfAkind(presedDice);
        let FullHouseObject = rules.FullHouse(presedDice);

        if (ThreeOfAkindObject) {
            if (ThreeOfAkindObject.threeIndex === 1) {
                if (ThreeOfAkindObject.NumNotPartOfTheThree === 5) {
                    return (1000 + 50);
                } else {
                    return (1000);
                }
            } else {
                if (ThreeOfAkindObject.NumNotPartOfTheThree === 5) {
                    return ((ThreeOfAkindObject.threeIndex * 100) + 50);
                } else if (ThreeOfAkindObject.NumNotPartOfTheThree === 1) {
                    return ((ThreeOfAkindObject.threeIndex * 100) + 100);
                } else {
                    return ((ThreeOfAkindObject.threeIndex * 100));
                }
            }
        }
        else if (rules.fourOfAkind(presedDice)) {
            return ((2000));
        } else if (FullHouseObject) {
            if (FullHouseObject.NumberNotPartOfFullHouse === 1) {
                return (800);
            } else if (FullHouseObject.NumberNotPartOfFullHouse === 5) {
                return (750);
            } else {
                return (700);
            }
        } else if (rules.TwothreeOfAkind(presedDice)) {
            return ((2500));
        }
        else {
            for (let i = 0; i < presedDice.length; i++) {
                if (presedDice[i] === 1) {
                    temp += 100
                } else if (presedDice[i] === 5) {
                    temp += 50
                }
            }
            return (temp);
        }
    }

    function roll() {
        setdices(dice.map((dice, i) => locked[i] ? dice : Math.floor(Math.random() * ((6 - 1) + 1) + 1)));
        setisRoled(!isRoled);
        setSumBeforePass(canculateScore());
        setPresedDice([])
    }

    function pass() {
        setLocked(locked.map((locke) => !locked))
        setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
        const tempScore = canculateScore();
        if (playerTurn) {
            setplayerOneSum(playerOneSum + tempScore);
        } else {
            setPlayerTwoSum(playerTwoSum + tempScore);
        }
        setSumBeforePass(0);
        setPresedDice([])
        setplayerTurn(!playerTurn)
    }

    const bolll = rules.nothing(presedDice);
    const bollpass = rules.nothing(presedDice);
    return (
        <div className="maindiv">
            <h1> iBourla   <i className="fas fa-dice-six"> </i></h1>
            {start && <div>  <p> Player One: {playerOneSum}</p>
                <p> Player Two: {playerTwoSum}</p>
                <p> Turn score: {SumBeforePass} </p> </div>}
            {playerOneSum === 1000 ? <p>the winner is : player one</p> : playerTwoSum === 1000 ? <p>the winner is :  player two</p> : null}
            <div className="dicecontiner">
                <Dice dice={dice} locked={locked} handleClick={toggleLocked} isRoled={isRoled} />
            </div>
            {playerTurn ? <p>player one is playing</p> : <p>player two is playing</p>}
            {start ? bolll ? <button className="roll" onClick={roll}> Roll </button> : <button className="disaled" disabled> Roll </button> : null}
            {start ? bollpass ? <button className="pass" onClick={pass}> Pass </button> : <button className="disaled" disabled > Pass </button> : null}
            {!start ? <button className="start-button" onClick={startgame}> Start</button> : null}
            <br />   <br />  <br /> <p>   Find me At: <a href="https://github.com/aviadbourla"> <i class="fab fa-git"></i> </a>
                <a href="https://il.linkedin.com/in/aviad-bourla-56b4351aa"> <i class="fab fa-linkedin"></i> </a></p>
        </div>
    )
}

export default Board;