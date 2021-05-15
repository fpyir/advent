/*
    Santa is delivering presents to an infinite two-dimensional grid of houses.

    He begins by delivering a present to the house at his starting location, and then an elf at the North Pole calls him via
    radio and tells him where to move next. Moves are always exactly one house to the north (^), south (v), east (>), or west
    (<). After each move, he delivers another present to the house at his new location.

    However, the elf back at the north pole has had a little too much eggnog, and so his directions are a little off, and Santa
    ends up visiting some houses more than once. How many houses receive at least one present?

    For example:
        -   > delivers presents to 2 houses: one at the starting location, and one to the east.
        -   ^>v< delivers presents to 4 houses in a square, including twice to the house at his starting/ending location.
        -   ^v^v^v^v^v delivers a bunch of presents to some very lucky children at only 2 houses.
*/

const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '3.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8').split('');

const DIRECTIONS = {
    NORTH: '^',
    SOUTH: 'v',
    EAST: '>',
    WEST: '<',
};

const addMove = ({ x, y }, move) => {
    switch (move) {
        case DIRECTIONS.NORTH:
            return { x, y: y + 1 };
        case DIRECTIONS.SOUTH:
            return { x, y: y - 1 };
        case DIRECTIONS.EAST:
            return { x: x + 1, y };
        case DIRECTIONS.WEST:
            return { x: x - 1, y };
        default:
            return { x, y };
    }
}


const getHousesVistedOnce = (moves) => {
    let coord = { x: 0, y: 0 };

    const coordinates = new Set(['0x0']);

    for (const move of moves) {
        coord = addMove(coord, move);

        coordinates.add(`${coord.x}x${coord.y}`);
    }

    return coordinates.size;
}

console.log(`visited ${getHousesVistedOnce(PUZZLE_INPUT)} houses at least once`); // answer: 2592.
