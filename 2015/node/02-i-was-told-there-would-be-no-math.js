/*
    -- Day 2: I Was Told There Would Be No Math --

    The elves are running low on wrapping paper, and so they need to submit an order for more. They have a list of the
    dimensions (length l, width w, and height h) of each present, and only want to order exactly as much as they need.

    Fortunately, every present is a box (a perfect right rectangular prism), which makes calculating the required
    wrapping paper for each gift a little easier: find the surface area of the box, which is 2*l*w + 2*w*h + 2*h*l.
    The elves also need a little extra paper for each present: the area of the smallest side.

    For example:
        - A present with dimensions 2x3x4 requires 2*6 + 2*12 + 2*8 = 52 square feet of wrapping paper plus 6 square
          feet of slack, for a total of 58 square feet.
        - A present with dimensions 1x1x10 requires 2*1 + 2*10 + 2*10 = 42 square feet of wrapping paper plus 1 square
          foot of slack, for a total of 43 square feet.

    All numbers in the elves' list are in feet. How many total square feet of wrapping paper should they order?
*/
const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '2.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8').split('\n');

const getSqFtRequired = (dimensions) => {
    const [length, width, height] = dimensions.split('x').map(i => Number(i));

    const side1 = length * width;
    const side2 = width * height;
    const side3 = height * length;

    const slack = Math.min(side1, side2, side3);

    return 2 * side1 + 2 * side2 + 2 * side3 + slack;
}

const getTotalSqFtRequired = (packageList) => {
    return packageList
        .map(dimensions => getSqFtRequired(dimensions))
        .reduce((a, b) => a + b, 0);
};

const getRibbonLength = (dimensions) => {
    const [length, width, height] = dimensions.split('x').map(i => Number(i));
    const smallestSides = [length, width, height].sort((a, b) => a - b).slice(0, 2);

    const wrappingRibbon = smallestSides[0] * 2 + smallestSides[1] * 2;
    const bowRibbon = length * width * height; 
    
    return wrappingRibbon + bowRibbon;
}

const getTotalRibbonRequired = (packageList) => {
    return packageList
        .map(dimensions => getRibbonLength(dimensions))
        .reduce((a, b) => a + b, 0);
}

console.log(`you need ${getTotalSqFtRequired(PUZZLE_INPUT)} sq ft of wapping paper`); // answer: 1606483
console.log(`you need ${getTotalRibbonRequired(PUZZLE_INPUT)} feet of ribbon`); // answer: 3842356
