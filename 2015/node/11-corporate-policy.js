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
      console.log(password[i], nextLetter);
      password[i] = nextLetter;

      shouldIncrement = nextLetter === "a";
    }
  }

  return password.join("");
};

const hasBadChars = (password) => Boolean(password.match(/[iol]/));

const hasTwoPairs = (password) => {
  const onePairRemoved = password.replace(/(.)\1{1}/, "");
  const secondPairRemoved = onePairRemoved.replace(/(.)\1{1}/, "");

  return (
    secondPairRemoved.length < onePairRemoved.length &&
    onePairRemoved.length < password.length
  );
};

const hasIncreasingStraight = (password) => {
  let hasIncreasingStraight = false;
  let straightCount = 0;
  let prevChar = password[0];

  for (const char of password.slice(1)) {
    if (char === getNextLetter(prevChar)) {
      straightCount += 1;
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
  // console.log("hasBadChars", hasBadChars(password));
  // console.log("hasTwoPairs", hasTwoPairs(password));
  // console.log("hasIncreasingStraight", hasIncreasingStraight(password));

  return (
    !hasBadChars(password) &&
    hasTwoPairs(password) &&
    hasIncreasingStraight(password)
  );
};

const makeValidPassword = (password) => {
  let nextPassword = makeNewPassword(password);

  let isValid = isValidPassword(nextPassword);

  while (!isValid) {
    nextPassword = makeNewPassword(nextPassword);
    console.log(nextPassword);
    isValid = isValidPassword(nextPassword);
  }

  return nextPassword;
};

console.log("validPassword", makeValidPassword("cqjxjnds"));
