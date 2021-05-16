/*
    Santa needs help figuring out which strings in his text file are naughty or nice.

    A nice string is one with all of the following properties:
       - It contains at least three vowels (aeiou only), like aei, xazegov, or aeiouaeiouaeiou.
       - It contains at least one letter that appears twice in a row, like xx, abcdde (dd), or aabbccdd (aa, bb, cc, or dd).
       - It does not contain the strings ab, cd, pq, or xy, even if they are part of one of the other requirements.

    For example:
       - ugknbfddgicrmopn is nice because it has at least three vowels (u...i...o...), a double letter (...dd...), and none of the disallowed substrings.
       - aaa is nice because it has at least three vowels and a double letter, even though the letters used by different rules overlap.
       - jchzalrnumimnmhp is naughty because it has no double letter.
       - haegwjzuvuyypxyu is naughty because it contains the string xy.
       - dvszwmarrgswjxmb is naughty because it contains only one vowel.

    How many strings are nice?
*/

const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '5.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8').split('\n');

const VOWELS = 'aeiou';
const NAUGHTIES = ['ab', 'cd', 'pq', 'xy'];

const isNiceV1 = (str) => {
    const numVowels = str.match(/[aeiou]/g);
    const numNaughties = str.match(/ab|cd|pq|xy/g);
    const numDoubles = str.match(/([a-z])\1/);

    return (
        (numVowels && numVowels.length > 2) &&
        (!numNaughties || numNaughties.length == 0) &&
        (numDoubles && numDoubles.length > 0)
    );
}

const isNiceV2 = (str) => {
    const numLetterSpacedPairs = str.match(/([a-z])[a-z]\1/g);
    const matchBetweenPairs = str.match(/([a-z][a-z])[a-z]*\1/);

    return (
        (numLetterSpacedPairs && numLetterSpacedPairs.length > 0) &&
        (matchBetweenPairs && matchBetweenPairs.length > 0)
    );
}

const howManyAreNice = (strings, matcher) => {
    return strings.reduce((count, str) => matcher(str) ? count + 1 : count, 0);
}

console.log(`there are ${howManyAreNice(PUZZLE_INPUT, isNiceV1)} nice strings`);
console.log(`there are ${howManyAreNice(PUZZLE_INPUT, isNiceV2)} nice strings`);
