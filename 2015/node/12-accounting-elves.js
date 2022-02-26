const fs = require("fs");
const path = require("path");

const PUZZLE_PATH = path.resolve(__dirname, "..", "inputs", "12.txt");
const PUZZLE_INPUT = JSON.parse(fs.readFileSync(PUZZLE_PATH, "utf8"));

const sumObjectLeaves = (object, excludeColor = null) => {
  let total = 0;

  for (const value of Object.values(object)) {
    if (typeof value === "number") {
      total += Number(value);
    } else if (typeof value === "object") {
      total += sumObjectLeaves(value, excludeColor);
    } else if (
      typeof value === "string" &&
      !Array.isArray(object) &&
      value === excludeColor
    ) {
      return 0;
    }
  }

  return total;
};

console.log("total sum", sumObjectLeaves(PUZZLE_INPUT));
console.log("without red", sumObjectLeaves(PUZZLE_INPUT, "red"));
