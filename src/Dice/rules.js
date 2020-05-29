
function sum(dice) {
    return dice.reduce((prev, curr) => prev + curr);
}
function freq(dice) {
    const freqs = new Map();
    for (let d of dice) freqs.set(d, (freqs.get(d) || 0) + 1)
    return Array.from(freqs)
}

function oneOrFive(dice) {
    const arr = freq(dice);
    return ((dice.includes(5) || dice.includes(1)));
 }

function notOneOrFive(dice) {
    return ((dice.includes(2) || dice.includes(3) || dice.includes(4) || dice.includes(6)));
}

function nothing(dice) {
    if ((threeOfAkind(dice) || fourOfAkind(dice) || TwothreeOfAkind(dice) || FullHouse(dice) || ThreePairs(dice)) || (oneOrFive(dice) && !notOneOrFive(dice))) {
        return true;
    } else {
        return false;
    }
}

function threeOfAkind(dice) {
    let boltemp = 0;
    let tempIdx = { boll: false, NumNotPartOfTheThree: 0, threeIndex: 0 };
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 3 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 3) {
                    boltemp++;
                    tempIdx.threeIndex = temp[0];
                } else {
                    tempIdx.NumNotPartOfTheThree = temp[0]; //add how many times this num
                }
            }
            if (boltemp >= 1) {
                return tempIdx;
            } else {
                return false;
            }
        } else {
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
    const arr = freq(dice);
    if (dice.length < 3) {
        return false;
    } else {
        if (arr.length > 1) {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] !== 4 && (temp[0] !== 5 && temp[0] !== 1)) {
                    return false
                } else if (temp[1] === 4) {
                    boltemp++;
                }
            }
            if (boltemp >= 1) {
                return true;
            } else {
                return false;
            }
        } else {
            for (let i = 0; i < arr.length; i++) {
                const temp = arr[i];
                if (temp[1] === 4) {
                    return true
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
                    } else {
                        tempIdx.NumberNotPartOfFullHouse = 5;
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
export default { sum, freq, oneOrFive, threeOfAkind, fourOfAkind, nothing, TwothreeOfAkind, FullHouse, ThreePairs };


 