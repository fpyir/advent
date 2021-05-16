const md5 = require('crypto-js/md5');

const PUZZLE_INPUT = 'iwrupvqb';

const crackMd5Hash = (input, lengthOfZeroes) => {
    let hash = '';
    let number = 0;

    const START_MATCH = Array(lengthOfZeroes).fill('0').join('');

    while (hash.slice(0, lengthOfZeroes) !== START_MATCH) {
        number += 1;
        hash = md5(input + number).toString();
    }

    return number;
}

console.log(`the number needed is ${crackMd5Hash(PUZZLE_INPUT, 5)}`); // answer: 346386
console.log(`the number needed is ${crackMd5Hash(PUZZLE_INPUT, 6)}`); // answer: 9958218
