/*
    -- Day 1: Not Quite Lisp --

    Santa was hoping for a white Christmas, but his weather machine's "snow" function is powered by stars, and he's fresh
    out! To save Christmas, he needs you to collect fifty stars by December 25th.

    Collect stars by helping Santa solve puzzles. Two puzzles will be made available on each day in the Advent calendar;
    the second puzzle is unlocked when you complete the first. Each puzzle grants one star. Good luck!

    Here's an easy puzzle to warm you up.

    Santa is trying to deliver presents in a large apartment building, but he can't find the right floor - the directions
    he got are a little confusing. He starts on the ground floor (floor 0) and then follows the instructions one character
    at a time.

    An opening parenthesis, (, means he should go up one floor, and a closing parenthesis, ), means he should go down one
    floor.

    The apartment building is very tall, and the basement is very deep; he will never find the top or bottom floors.

    For example:
        (()) and ()() both result in floor 0.
        ((( and (()(()( both result in floor 3.
        ))((((( also results in floor 3.
        ()) and ))( both result in floor -1 (the first basement level).
        ))) and )())()) both result in floor -3.

    To what floor do the instructions take Santa?
*/

const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '1.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8');

const UP = "(";
const DOWN = ")";

const whatFloor = (instructions) => {
    let levelsUp = 0;
    let levelsDown = 0;

    for (const direction of instructions) {
        if (direction === UP) {
            levelsUp += 1;
        } else if (direction === DOWN) {
            levelsDown += 1;
        }
    }

    return levelsUp - levelsDown;
};

const firstToBasement = (instructions) => {
    let floor = 0;

    for (let i = 0; i < instructions.length; i++) {
        const direction = instructions[i];

        if (direction === UP) {
            floor += 1;
        } else if (direction === DOWN) {
            floor -= 1;
        }

        if (floor === -1) {
            return i + 1;
        }
    }
}

console.log(`you will arrive on floor: ${whatFloor(PUZZLE_INPUT)}`);
// answer: 138.

console.log(`you will enter the basement on move: ${firstToBasement(PUZZLE_INPUT)}`);
// answer: 1771
