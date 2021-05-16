/*
    --- Day 7: Some Assembly Required ---

    This year, Santa brought little Bobby Tables a set of wires and bitwise logic gates! Unfortunately, little Bobby is a
    little under the recommended age range, and he needs help assembling the circuit.

    Each wire has an identifier (some lowercase letters) and can carry a 16-bit signal (a number from 0 to 65535). A signal
    is provided to each wire by a gate, another wire, or some specific value. Each wire can only get a signal from one source,
    but can provide its signal to multiple destinations. A gate provides no signal until all of its inputs have a signal.

    The included instructions booklet describes how to connect the parts together: x AND y -> z means to connect wires x and
    y to an AND gate, and then connect its output to wire z.

    For example:
        - 123 -> x means that the signal 123 is provided to wire x.
        - x AND y -> z means that the bitwise AND of wire x and wire y is provided to wire z.
        - p LSHIFT 2 -> q means that the value from wire p is left-shifted by 2 and then provided to wire q.
        - NOT e -> f means that the bitwise complement of the value from wire e is provided to wire f.

    Other possible gates include OR (bitwise OR) and RSHIFT (right-shift). If, for some reason, you'd like to emulate the
    circuit instead, almost all programming languages (for example, C, JavaScript, or Python) provide operators for these gates.

    In little Bobby's kit's instructions booklet (provided as your puzzle input), what signal is ultimately provided to wire a?
*/


/*
    This solution is unfortunately not really mine. I got lost and made the mistake of googling for tips and ended up staring at a full
    solution. From that moment on I couldn't ignore what I saw and work it out myself, my brain was locked in.

    Lesson learnt.
*/

const fs = require('fs');
const path = require('path');

const PUZZLE_PATH = path.resolve(__dirname, '..', 'inputs', '7.txt');
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, 'utf8').split('\n');

const BTIWISE = {
    AND: (a, b) => a & b,
    OR: (a, b) => a | b,
    NOT: (a) => ~a,
    LSHIFT: (a, b) => a << b,
    RSHIFT: (a, b) => a >> b,
}

const parseInstruction = (instruction) => {
    const command = instruction.match(/[A-Z]+/g);
    const arguments = instruction.match(/[A-z0-9]+/g);
    const destination = arguments.pop();

    return {
        command: command ? command[0] : null,
        args: arguments.map(arg => isNaN(Number(arg)) ? arg : Number(arg)),
        destination,
    }
}

const CIRCUIT = {};

for (let instruction of PUZZLE_INPUT) {
    const { command, args, destination } = parseInstruction(instruction);
    CIRCUIT[destination] = { command, args };
}


const findValueOfWire = (wireName) => {
    const wire = CIRCUIT[wireName];
    console.log(wire);

    if (typeof wireName === 'number') {
        return wireName;
    } else if (typeof wire === 'number') {
        return wire;
    } else if (typeof wire === 'undefined') {
        return undefined;
    }

    if (!wire.command) {
        CIRCUIT[wireName] = findValueOfWire(wire.args[0]);
    } else {
        CIRCUIT[wireName] = wire.command(
            findValueOfWire(wire.args[0]),
            findValueOfWire(wire.args[1]),
        );
    }

    return CIRCUIT[wireName];
}

console.log(`value of wire 'a' is ${findValueOfWire('a')}`);
