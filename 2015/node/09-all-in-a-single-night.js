const fs = require("fs");
const path = require("path");

const PUZZLE_PATH = path.resolve(__dirname, "..", "inputs", "9.txt");
const PUZZLE_INPUT = fs.readFileSync(PUZZLE_PATH, "utf8").split("\n");

/**
 * Approach:
 *  1. Parse location pairs into a map of distances.
 *  2. Generate all possible path permutations
 *  3. Iterate through possible paths, filtering out impossible ones and calculating total distance for each path.
 *  4. Pick shortest path.
 */

const parseLocationPairs = (pairs) => {
  const distanceMap = {};

  for (const pair of pairs) {
    const [locations, rawDistance] = pair.split("=");
    const [rawFrom, rawTo] = locations.trim().split(" to ");

    const distance = Number(rawDistance.trim());
    const fromLocation = rawFrom.trim();
    const toLocation = rawTo.trim();

    if (distanceMap[fromLocation] !== undefined) {
      distanceMap[fromLocation][toLocation] = distance;
    } else {
      distanceMap[fromLocation] = { [toLocation]: distance };
    }

    if (distanceMap[toLocation] !== undefined) {
      distanceMap[toLocation][fromLocation] = distance;
    } else {
      distanceMap[toLocation] = { [fromLocation]: distance };
    }
  }

  return distanceMap;
};

const permutator = (inputArr) => {
  let result = [];

  const permute = (arr, m = []) => {
    if (arr.length === 0) {
      result.push(m);
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next));
      }
    }
  };

  permute(inputArr);

  return result;
};

const distanceMap = parseLocationPairs(PUZZLE_INPUT);
const locations = Object.keys(distanceMap);

const findPathMatchingCriteria = (criteria, distanceMap, possiblePaths) => {
  let bestDistance = criteria === "short" ? Infinity : 0;
  let bestPath = [];

  for (const path of possiblePaths) {
    const originalPath = [...path];

    let totalDistance = 0;
    let currentLocation = path.shift();
    let isInvalid = false;

    while (path.length > 0) {
      const nextStop = path.shift();

      const distances = distanceMap[currentLocation];

      if (distances[nextStop] === undefined) {
        // Invalid path
        isInvalid = true;
        break;
      }

      totalDistance += distances[nextStop];
      currentLocation = nextStop;
    }

    if (isInvalid) {
      continue;
    }

    if (criteria === "short" && totalDistance < bestDistance) {
      bestDistance = totalDistance;
      bestPath = originalPath;
    }

    if (criteria === "long" && totalDistance > bestDistance) {
      bestDistance = totalDistance;
      bestPath = originalPath;
    }
  }

  return [bestPath.join(" -> "), bestDistance];
};

const [shortestPath, shortestDistance] = findPathMatchingCriteria(
  "short",
  distanceMap,
  permutator(locations)
);

const [longestPath, longestDistance] = findPathMatchingCriteria(
  "long",
  distanceMap,
  permutator(locations)
);

console.log("shortestDistance", shortestDistance);
console.log("shortestPath", shortestPath);
console.log("");
console.log("longestDistance", longestDistance);
console.log("longestPath", longestPath);
