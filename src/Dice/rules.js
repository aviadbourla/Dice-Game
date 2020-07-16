
function sum(dice) {
    return dice.reduce((prev, curr) => prev + curr);
}

//returns the frequency of numbers in the 6 dice
function freq(dice) {
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1)
    return Array.from(freqs)
}
//check if 5 or 1 includes in the dice
function oneOrFive(dice) {
    const arr = freq(dice);
    return ((dice.includes(5) || dice.includes(1)));
}

//check if there isnt 5 or 1 includes in the dice
function notOneOrFive(dice) {
    return ((dice.includes(2) || dice.includes(3) || dice.includes(4) || dice.includes(6)));
}

//check if the player has a legal play.
function nothing(dice) {
    if ((threeOfAkind(dice) || fourOfAkind(dice) || ThreePairs(dice) || TwoThrees(dice) || straight(dice) || FiveOfAkind(dice) || sixOfAkind(dice)) || (oneOrFive(dice) && !notOneOrFive(dice))) {
        return true;
    } else {
        return false;
    }
}

//check if the player has a legal play.
function nothingStart(dice) {
    if ((IfthreeOfAkind(dice) || IfFourOfAkind(dice) || FullHouse(dice) || ThreePairs(dice)) || straight(dice) || FiveOfAkind(dice) || (oneOrFive(dice) && !notOneOrFive(dice) || oneOrFive(dice))) {
        return true;
    } else {
        return false;
    }
}

function IfthreeOfAkind(dice) {
    const arr = freq(dice);
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp[1] === 3) {
            return true
        }
    }
    return false;
}

function IfFourOfAkind(dice) {
    const arr = freq(dice);
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i];
        if (temp[1] === 4) {
            return true
        }
    }
    return false;
}


function threeOfAkind(dice) {
    let boltemp = 0;
    let bool = true;
    let tempIdx = { boll: false, NumNotPartOfTheThree: 0, NumNotPartOfTheThreeIsFive: 0, counterOne: 0, counterFive: 0, threeIndex: 0 };
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length === 2) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 3 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false;
                } else if (temp[1] === 3) {
                    boltemp++;
                    tempIdx.threeIndex = temp[0];
                } else {
                    if (temp[0] === 1) {
                        tempIdx.NumNotPartOfTheThree = 1;
                        tempIdx.counterOne = temp[1];
                    } else if (temp[0] === 5) {
                        tempIdx.NumNotPartOfTheThreeIsFive = 5;
                        tempIdx.counterFive = temp[1];

                    }
                }
            }
            if (boltemp >= 1) {
                return tempIdx;
            } else {
                return false;
            }
        } else if (arr.length > 2) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 3 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 3) {
                    boltemp++;
                    tempIdx.threeIndex = temp[0];
                } else if (temp[0] === 1) {
                    tempIdx.NumNotPartOfTheThree = 1;  //add how many times this num
                    tempIdx.counterOne = temp[1]
                } else if (temp[0] === 5) {
                    tempIdx.NumNotPartOfTheThreeIsFive = 5;
                    tempIdx.counterFive = temp[1]
                }
            }
            if (boltemp >= 1) {
                return tempIdx;
            } else {
                return false;
            }
        }
        else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 3) {
                    tempIdx.threeIndex = temp[0];
                    return tempIdx;
                }
            }
        }
        return false;
    }
}

function fourOfAkind(dice) {
    let boltemp = 0;
    let tempIdxFourOfAkind = { boll: false, NumNotPartOfTheFoure: 0, NumNotPartOfTheFoureIsFive: 0, counterOne: 0, counterFive: 0 };
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length === 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 4 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 4) {
                    boltemp++;
                }
            }
            if (boltemp >= 1) {
                tempIdxFourOfAkind.boll = true;
                return tempIdxFourOfAkind;
            } else {
                return false;
            }
        } else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 4 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 4) {
                    boltemp++;
                } else if (temp[0] === 1) {
                    tempIdxFourOfAkind.NumNotPartOfTheFoure = 1;  //add how many times this num
                    tempIdxFourOfAkind.counterOne = temp[1]
                } else if (temp[0] === 5) {
                    tempIdxFourOfAkind.NumNotPartOfTheFoureIsFive = 5;
                    tempIdxFourOfAkind.counterFive = temp[1]
                }
            }
            if (boltemp >= 1) {
                tempIdxFourOfAkind.boll = true;
                return tempIdxFourOfAkind;
            } else {
                return false;
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 4) {
                    tempIdxFourOfAkind.boll = true;
                    return tempIdxFourOfAkind
                }
            }
        }
        return false;
    }
}


function FiveOfAkind(dice) {
    let boltemp = 0;
    let tempIdxFiveOfAkind = { boll: false, NumNotPartOfTheFive: 0 };
    const arr = freq(dice);
    if (dice.length < 5) {
        return false;
    } else {
        if (arr.length === 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 5 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 5) {
                    boltemp++;
                }
            }
            if (boltemp >= 1) {
                tempIdxFiveOfAkind.boll = true;
                return tempIdxFiveOfAkind;
            } else {
                return false;
            }
        } else if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 5 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 5) {
                    boltemp++;
                } else if (temp[0] === 1) {
                    tempIdxFiveOfAkind.NumNotPartOfTheFive = 1;  //add how many times this num
                } else if (temp[0] === 5) {
                    tempIdxFiveOfAkind.NumNotPartOfTheFoureIsFive = 5;
                }
            }
            if (boltemp >= 1) {
                tempIdxFiveOfAkind.boll = true;
                return tempIdxFiveOfAkind;
            } else {
                return false;
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 5) {
                    tempIdxFiveOfAkind.boll = true;
                    return tempIdxFiveOfAkind
                }
            }
        }
        return false;
    }
}

function TwothreeOfAkind(dice) {
    const arr = freq(dice);
    if (arr.length === 3) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 2) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function FullHouse(dice) {
    let threes = 0;
    let dows = 0;
    let tempIdx = { boll: false, NumberNotPartOfFullHouse: 0 };
    const arr = freq(dice);
    if (arr.length >= 2) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 3) {
                if (temp[1] !== 2) {
                    if (temp[0] === 1) {
                        tempIdx.NumberNotPartOfFullHouse = 1;
                    } else if (temp[0] === 5) {
                        tempIdx.NumberNotPartOfFullHouse = 5;
                    } else {
                        return false;
                    }
                } else {
                    dows++;
                }
            } else {
                threes++
            }
        }
        if (dows === 1 && threes === 1) {
            return tempIdx;
        }
        else {
            return false;
        }
    }
    return false;
}


function ThreePairs(dice) {
    const arr = freq(dice);
    if (arr.length === 3) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 2) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function TwoThrees(dice) {
    const arr = freq(dice);
    if (arr.length === 2) {
        for (let i = 0; i < arr.length; i++) {
            const temp = arr[i];
            if (temp[1] !== 3) {
                return false;
            }
        }
        return true;
    }
    return false;
}

function sixOfAkind(dice) {
    if (dice.length < 6) {
        return false;
    }
    for (let i = 0; i < dice.length - 1; i++) {
        if (dice[i] !== dice[i + 1]) {
            return false
        }
    }
    return true;
}

function straight(dice) {
    const arr = freq(dice);
    if (arr.length === 6) {
        return true
    }
    return false;
}
export default { sum, freq, oneOrFive, threeOfAkind, fourOfAkind, nothing, TwothreeOfAkind, FullHouse, ThreePairs, nothingStart, TwoThrees, FiveOfAkind, sixOfAkind, straight };

