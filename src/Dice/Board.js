import React, { useState, useEffect } from 'react';
import Dice from './Dice'
import rules from './rules';
import Instructions from '../Instructions'
import AlertDialogSlide from './AlertDialogSlide'
import AlertDialogSlideWinner from './AlertDialogSlideWinner';
import GitHubIcon from '@material-ui/icons/GitHub';
import './dice.css';

const Board = () => {
    const [dice, setdices] = useState(Array(6).fill(null));
    const [presedDice, setPresedDice] = useState([]);
    const [UnpresedDice, setUnpresedDice] = useState([]);
    const [afterRollUnpressedDice, setAfterRollUnpressedDice] = useState([]);
    const [sumAfterRoll, setSumAfterRoll] = useState(0);
    const [SumBeforePass, setSumBeforePass] = useState(0);
    const [bol, setBoll] = useState(true);
    const [locked, setLocked] = useState(Array(6).fill(false));
    const [isRoled, setisRoled] = useState(true);
    const [playerOneSum, setplayerOneSum] = useState(0);
    const [playerTwoSum, setPlayerTwoSum] = useState(0);
    const [playerTurn, setplayerTurn] = useState(true);
    const [start, setStart] = useState(false);
    const [over1000PlayerOne, setover1000PlayerOne] = useState(false);
    const [over1000PlayerTwo, setover1000PlayerTwo] = useState(false);

    useEffect(() => {
        if (SumBeforePass >= 1000 && playerOneSum === 0 && playerTurn) {
            setover1000PlayerOne(true);
        }
        if (SumBeforePass >= 1000 && playerTwoSum === 0 && !playerTurn) {
            setover1000PlayerTwo(true);
        }
    }, [SumBeforePass])

    useEffect(() => {
        setSumBeforePass(sumAfterRoll + canculateScore());
    }, [bol])

    useEffect(() => {
        const temp = dice.concat().sort();
        const temp2 = UnpresedDice.sort();
        const temp3 = [];
        for (let i = 0, j = 0; i <= temp.length - 1; i++) {
            if (j > temp2.length - 1) {
                temp3.push(temp[i]);
            }
            if (temp[i] > temp2[i]) {
                temp3.push(temp2[j])
                j++;
            } else if (temp[i] < temp2[j]) {
                temp3.push(temp[i])
                j--
            }
            j++;
        }
        setAfterRollUnpressedDice(temp3)
        if (temp3[0] !== null) {
            if ((rules.nothingStart(temp3) === false)) {
                alert(`FARkLE \n You lost${' ' + SumBeforePass} points!`)
                setplayerTurn(!playerTurn)
                setLocked(locked.map((locke) => !locked))
                setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
                setSumBeforePass(0)
                setSumAfterRoll(0)

            }
        }
        setPresedDice([])
    }, [isRoled])

    useEffect(() => {
        if (dice[0] !== null) {
            if ((rules.nothingStart(dice) === false)) {
                alert(`FARkLE \n You lost${' ' + SumBeforePass} points!`)
                setplayerTurn(!playerTurn)
                setLocked(locked.map((locke) => !locked))
                setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
                setSumBeforePass(0)
                setSumAfterRoll(0)
            }
        }
    }, [dice])

    function startgame() {
        setdices(dice.map((dice, i) => locked[i] ? dice : Math.floor(Math.random() * ((6 - 1) + 1) + 1)));
        canculateScore();
        setStart(true)
    }

    function toggleLocked(idx) {
        //idx == index of the dice in the dice arr 
        //dice[idx] == value of the index preesed
        setLocked([...locked.slice(0, idx), !locked[idx], ...locked.slice(idx + 1)])
        if (locked[idx] === false) {
            setPresedDice([...presedDice, dice[idx]]);
            setBoll(!bol)
        } else {
            let tempIndex = presedDice.indexOf(dice[idx])
            let tempArr = presedDice;
            let temp = [];
            console.log(tempArr);
            if (tempIndex > -1) {
                temp = tempArr.splice(tempIndex, 1);
                setPresedDice(tempArr);
                setSumBeforePass(canculateScore());
                setBoll(!bol)
            }
        }
    }

    function canculateScore() {

        let temp = 0;
        let ThreeOfAkindObject = rules.threeOfAkind(presedDice);
        let FourOfAkindObject = rules.fourOfAkind(presedDice);
        let FullHouseObject = rules.FullHouse(presedDice);
        let FiveOfAkindObject = rules.FiveOfAkind(presedDice);

        if (ThreeOfAkindObject && !FourOfAkindObject && !rules.TwoThrees(presedDice)) {
            if (ThreeOfAkindObject.threeIndex === 1) {
                if (ThreeOfAkindObject.NumNotPartOfTheThreeIsFive === 5) {
                    return (300 + (50 * ThreeOfAkindObject.counterFive));
                } else {
                    return (300);
                }
            } else {
                if (ThreeOfAkindObject.NumNotPartOfTheThreeIsFive === 5 && ThreeOfAkindObject.NumNotPartOfTheThree === 1) {
                    return ((ThreeOfAkindObject.threeIndex * 100) + (50 * ThreeOfAkindObject.counterFive) + (100 * ThreeOfAkindObject.counterOne));
                } else if (ThreeOfAkindObject.NumNotPartOfTheThreeIsFive === 5) {
                    return ((ThreeOfAkindObject.threeIndex * 100) + (50 * ThreeOfAkindObject.counterFive));
                } else if (ThreeOfAkindObject.NumNotPartOfTheThree === 1) {
                    return ((ThreeOfAkindObject.threeIndex * 100) + (100 * ThreeOfAkindObject.counterOne));
                } else {
                    return ((ThreeOfAkindObject.threeIndex * 100));
                }
            }
        }
        else if (rules.fourOfAkind(presedDice)) {
            if (FourOfAkindObject.NumNotPartOfTheFoureIsFive === 5 && FourOfAkindObject.NumNotPartOfTheFoure === 1) {
                return (1000 + (50 * FourOfAkindObject.counterFive) + (100 * FourOfAkindObject.counterOne));
            } else if (FourOfAkindObject.NumNotPartOfTheFoureIsFive === 5) {
                return (1000 + (50 * FourOfAkindObject.counterFive));
            } else if (FourOfAkindObject.NumNotPartOfTheFoure === 1) {
                return (1000 + (100 * FourOfAkindObject.counterOne));
            } else {
                return 1000;
            }
        } else if (rules.FiveOfAkind(presedDice)) {
            if (FiveOfAkindObject.NumNotPartOfTheFoureIsFive === 5) {
                return 2050;
            } else if (FiveOfAkindObject.NumNotPartOfTheFoureIsFive === 1) {
                return 2100
            }

        } else if (rules.TwoThrees(presedDice)) {
            return 2500;
        } else if (rules.straight(presedDice)) {
            return 1500;
        } else if (rules.ThreePairs(presedDice)) {
            return 1500;
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
        let Cheak = false;
        for (let i = 0; i <= locked.length - 1; i++) {
            if (locked[i] === false) {
                Cheak = true;
                break;
            }
        }
        if (Cheak === false) {
            setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
            setLocked(locked.map(lock => lock === false))
            setSumAfterRoll(SumBeforePass);
            setPresedDice([])
            setAfterRollUnpressedDice([])
            setisRoled(!isRoled);
        }
        else {
            setdices(dice.map((dice, i) => locked[i] ? dice : Math.floor(Math.random() * ((6 - 1) + 1) + 1)));
            let temp = [];
            for (let i = 0; i <= dice.length; i++) {
                if (locked[i] === true) {
                    temp.push(dice[i])
                }
            }
            setUnpresedDice(temp);
            setSumAfterRoll(SumBeforePass);
            setisRoled(!isRoled);
        }
    }

    function pass() {
        setLocked(locked.map((locke) => !locked))
        setdices(dice.map((dice) => dice = Math.floor(Math.random() * ((6 - 1) + 1) + 1)))
        const tempScore = sumAfterRoll + canculateScore();
        if (playerTurn) {
            setplayerOneSum(playerOneSum + tempScore);
        } else {
            setPlayerTwoSum(playerTwoSum + tempScore);
        }
        setSumBeforePass(0);
        setSumAfterRoll(0);
        setPresedDice([])
        setAfterRollUnpressedDice([])
        setplayerTurn(!playerTurn)
    }

    const bolll = rules.nothing(presedDice);
    const bollpass = rules.nothing(presedDice);
    let styleLinks = !start ? 'links-continer' : 'links-continer-after-start';

    return (
        <div className="maindiv">
            <h1> iBourla  <i className="fas fa-dice-six"> </i></h1>
            {start && <div>
                <p> Player One: {playerOneSum}</p>
                <p> Player Two: {playerTwoSum}</p>
                <p className="turn">
                    Turn score: {SumBeforePass}
                </p>
            </div>}
            {playerOneSum === 10000 ?
                <AlertDialogSlideWinner winner={"one"} openDialog={true} />
                : playerTwoSum === 10000 ?
                    <AlertDialogSlideWinner winner={"two"} openDialog={true} />
                    : <p></p>
            }
            <div className="dicecontiner">
                <Dice
                    dice={dice}
                    locked={locked}
                    handleClick={toggleLocked}
                    isRoled={!isRoled}
                />
            </div>
            {start && (playerTurn ?
                <p className="turn">player one is playing</p>
                : <p className="turn">player two is playing</p>)
            }
            {start ? bolll ?
                <button className="roll" onClick={roll}> Roll </button> :
                <button className="disaled" disabled> Roll </button>
                : null
            }
            {(playerTurn && over1000PlayerOne) && start ? bollpass ?
                <button className="pass" onClick={pass}> Pass </button> :
                <button className="disaled" disabled > Pass </button>
                : null
            }
            {(!playerTurn && over1000PlayerTwo) && start ? bollpass ?
                <button className="pass" onClick={pass}> Pass </button>
                : <button className="disaled" disabled > Pass </button>
                : null}
            <div className="buttons-div">
                {!start ? <button className="start-button" onClick={startgame}> Start</button> : null}
                {!start ? <AlertDialogSlide /> : null}
            </div>
            <div className={styleLinks}>
                <div>
                    <p className="Links-p">
                        Find me at :
                    </p>
                </div>
                <div className="links">
                    <a className="link" href="https://github.com/aviadbourla">
                        <i class="fab fa-github"></i>                    </a>
                    <a className="link" href="https://il.linkedin.com/in/aviad-bourla-56b4351aa">
                        <i class="fab fa-linkedin"></i>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default Board;