const PUZZLE_INPUT = "3113322113";

/**
 * For a list of digits, perform the "Look and Say" algorithm,
 * returning the resulting digit string.
 */
const lookAndSay = (digits) => {
  let newDigitString = "";

  let lastDigit = digits[0];
  let digitCount = 1;

  for (const digit of digits.slice(1)) {
    if (digit === lastDigit) {
      digitCount += 1;
    } else {
      newDigitString += `${digitCount}${lastDigit}`;
      lastDigit = digit;
      digitCount = 1;
    }
  }

  newDigitString += `${digitCount}${lastDigit}`;

  return newDigitString;
};

const lookAndSayNTimes = (digitString, numTimes) => {
  let currentDigitString = digitString;

  for (let total = 0; total < numTimes; total += 1) {
    currentDigitString = lookAndSay(currentDigitString);
  }

  return currentDigitString;
};

const partOne = lookAndSayNTimes(PUZZLE_INPUT, 40);
const partTwo = lookAndSayNTimes(PUZZLE_INPUT, 50);

console.log("partOne", partOne.length);
console.log("partTwo", partTwo.length);
