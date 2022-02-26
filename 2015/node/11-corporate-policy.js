const LETTERS = "abcdefghijklmnopqrstuvwxyz".split("");
const PUZZLE_INPUT = "cqjxjnds";

const getNextLetter = (char) => {
  const index = LETTERS.indexOf(char) + 1;

  return index === LETTERS.length ? "a" : LETTERS[index];
};

const makeNewPassword = (oldPassword) => {
  const password = oldPassword.split("");

  let shouldIncrement = true;

  for (let i = password.length - 1; i >= 0; i--) {
    if (shouldIncrement) {
      const nextLetter = getNextLetter(password[i]);
      password[i] = nextLetter;

      shouldIncrement = nextLetter === "a";
    }
  }

  return password.join("");
};

const hasBadChars = (password) => /i|o|l]/.test(password);

const hasTwoPairs = (password) =>
  Boolean(password.match(/([a-z])\1.+([a-z])\2/));

const hasIncreasingStraight = (password) => {
  let hasIncreasingStraight = false;
  let straightCount = 1;
  let prevChar = password[0];

  for (const char of password.slice(1)) {
    const nextChar = getNextLetter(prevChar);

    // don't match against z -> a
    if (char === nextChar && nextChar !== "a") {
      straightCount += 1;
    } else {
      straightCount = 1;
    }

    if (straightCount === 3) {
      hasIncreasingStraight = true;
      break;
    }

    prevChar = char;
  }

  return hasIncreasingStraight;
};

const isValidPassword = (password) => {
  return (
    !hasBadChars(password) &&
    hasTwoPairs(password) &&
    hasIncreasingStraight(password)
  );
};

const makeValidPassword = (password) => {
  let nextPassword = makeNewPassword(password);

  while (!isValidPassword(nextPassword)) {
    nextPassword = makeNewPassword(nextPassword);
  }

  return nextPassword;
};

const firstPassword = makeValidPassword(PUZZLE_INPUT);
const secondPassword = makeValidPassword(firstPassword);

console.log("first password", firstPassword);
console.log("second password", secondPassword);
