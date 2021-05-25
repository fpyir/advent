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

var wires = {};
function Wire(instruction) {
	this.calculate = this.generateValueGetter(instruction);
}

Wire.prototype.getValue = function() {
	if (this.value === undefined) {
		this.value = this.checkRange(this.calculate());
	}
	return this.value;
};

Wire.prototype.checkRange = function(i) {
	var n = 65536;
	return ((i%n)+n)%n;
};

Wire.prototype.generateValueGetter = function(instruction) {
	var assignMatch, opMatch;

	if (assignMatch = /^(NOT )?([0-9]+|[a-z]+)$/.exec(instruction)) {
		return function() {
			var value = parseValue(assignMatch[2]);
			if (assignMatch[1])
				value = ~ value;
			return value;
		}
	} else if (opMatch = /^([a-z]+|[0-9]+) (AND|OR|LSHIFT|RSHIFT) ([a-z]+|[0-9]+)$/.exec(instruction)) {
		var opCode = this.ops[opMatch[2]];

		return function() {
			return eval(parseValue(opMatch[1]) + ' ' + opCode + ' ' + parseValue(opMatch[3]));
		}

	}
};

Wire.prototype.ops = {
	'AND'    : '&',
	'OR'     : '|',
	'LSHIFT' : '<<',
	'RSHIFT' : '>>',
};

// Determine if a key refers to an integer or a wire & return its value
function parseValue(key) {
	var i = parseInt(key);
	return !isNaN(i) ? i : wires[key].getValue();
}

// Generate all wire objects
PUZZLE_INPUT.forEach(function(item) {
	var match;
	if (match = /(.*) -> ([a-z]+)/.exec(item))
		wires[match[2]] = new Wire(match[1]);
});

// Output Part One Answer
var partOne = wires.a.getValue();
console.log('Part One:', partOne);

// Reset for Part Two
Object.keys(wires).forEach(function(key) {
	wires[key].value = undefined;
});
wires.b.value = partOne;

// Output Part Two Answer
console.log('Part Two:', wires.a.getValue());
