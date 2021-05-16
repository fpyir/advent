/*
    --- Day 6: Probably a Fire Hazard ---

    Because your neighbors keep defeating you in the holiday house decorating contest year after year, you've decided to deploy
    one million lights in a 1000x1000 grid.

    Furthermore, because you've been especially nice this year, Santa has mailed you instructions on how to display the ideal
    lighting configuration.

    Lights in your grid are numbered from 0 to 999 in each direction; the lights at each corner are at 0,0, 0,999, 999,999, and 999,0.
    The instructions include whether to turn on, turn off, or toggle various inclusive ranges given as coordinate pairs.
    
    Each coordinate pair represents opposite corners of a rectangle, inclusive; a coordinate pair like 0,0 through 2,2 therefore
    refers to 9 lights in a 3x3 square. The lights all start turned off.

    To defeat your neighbors this year, all you have to do is set up your lights by doing the instructions Santa sent you in order.

    For example:
        - turn on 0,0 through 999,999 would turn on (or leave on) every light.
        - toggle 0,0 through 999,0 would toggle the first line of 1000 lights, turning off the ones that were on, and turning on the ones that were off.
        - turn off 499,499 through 500,500 would turn off (or leave off) the middle four lights.

    After following the instructions, how many lights are lit?
*/

const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '6.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8').split('\n');

const LIGHT_GRID = Array(1000).fill(Array(1000).fill(0));

const ACTIONS = {
    ON: 'ON',
    OFF: 'OFF',
    SWITCH: 'SWITCH',
}

const decodeInstruction = (instruction) => {
    let action = null;
    let instruct = instruction;
    
    if (instruction.startsWith('turn on')) {
        action = ACTIONS.ON;
        instruct = instruction.replace('turn on ', '');
    } else if (instruction.startsWith('turn off')) {
        action = ACTIONS.OFF;
        instruct = instruction.replace('turn off ', '');
    } else if (instruction.startsWith('toggle')) {
        action = ACTIONS.SWITCH;
        instruct = instruction.replace('toggle ', '');
    }

    const [strCoord1, strCoord2] = instruct.split(' through ');

    const coord1 = strCoord1.split(',').map(Number);
    const coord2 = strCoord2.split(',').map(Number);

    return { action, coord1, coord2 };
}

const flipLights = (lights, action, topLeft, bottomRight) => {
    const copyLights = JSON.parse(JSON.stringify(lights));

    for (let row = 0; row < copyLights.length; row++) {
        for (let col = 0; col < copyLights[row].length; col++) {
            if (
                row >= topLeft[0] &&
                row <= bottomRight[0] &&
                col >= topLeft[1] &&
                col <= bottomRight[1]
            ) {
                if (action === ACTIONS.ON) {
                    copyLights[row][col] = 1;
                } else if (action === ACTIONS.OFF) {
                    copyLights[row][col] = 0;
                } else if (action === ACTIONS.SWITCH) {
                    copyLights[row][col] = copyLights[row][col] ? 0 : 1;
                }
            }
        }
    }

    return copyLights;
};

const increaseLights = (lights, action, topLeft, bottomRight) => {
    const copyLights = JSON.parse(JSON.stringify(lights));

    for (let row = 0; row < copyLights.length; row++) {
        for (let col = 0; col < copyLights[row].length; col++) {
            if (
                row >= topLeft[0] &&
                row <= bottomRight[0] &&
                col >= topLeft[1] &&
                col <= bottomRight[1]
            ) {
                if (action === ACTIONS.ON) {
                    copyLights[row][col] += 1;
                } else if (action === ACTIONS.OFF) {
                    copyLights[row][col] = Math.max(copyLights[row][col] - 1, 0);
                } else if (action === ACTIONS.SWITCH) {
                    copyLights[row][col] += 2;
                }
            }
        }
    }

    return copyLights;
};

const howManyLightsAreOn = (lights) =>  {
    return lights.flat().reduce((count, light) => count + light, 0);
}

const executeInstructions = (grid, instructions, lightSwitch) => {
    let lights = grid;

    for (const instruction of instructions) {
        const { action, coord1, coord2 } = decodeInstruction(instruction);

        lights = lightSwitch(lights, action, coord1, coord2);
    }

    return lights;
}

const flippedLights = executeInstructions(LIGHT_GRID, PUZZLE_INPUT, flipLights);
const increasedLights = executeInstructions(LIGHT_GRID, PUZZLE_INPUT, increaseLights);

console.log(`v1: there are now ${howManyLightsAreOn(flippedLights)} lights on`); // answer: 569999
console.log(`v2: the total brightness is now ${howManyLightsAreOn(increasedLights)}`); // answer: 17836115
