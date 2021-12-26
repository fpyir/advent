const fs = require("fs");
const path = require("path");

const PUZZLE_PATH = path.resolve(__dirname, "..", "inputs", "8.txt");
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, "utf8").split("\n");

const getMemSize = (string) => {
  // Note: The order of these operations is important.
  const condensed = string
    .replace(/\\\\/g, "*")
    .replace(/\\"/g, "*")
    .replace(/\\x../g, "*");

  console.log(string, condensed);
  return condensed.length - 2;
};

const codeSizes = PUZZLE_INPUT.reduce((total, line) => total + line.length, 0);
const memSizes = PUZZLE_INPUT.reduce(
  (total, line) => total + getMemSize(line),
  0
);

console.log(PUZZLE_INPUT);
console.log(`codeSizes: ${codeSizes}`);
console.log(`memSizes: ${memSizes}`);
console.log(`the answer: ${codeSizes - memSizes}`);
