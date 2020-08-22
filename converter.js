const blacklist = require("./blacklist.js");
const fixed = require("./fixed.js");
const rules = require("./rules.js");

function convert(text) {
  text = text.toLowerCase();
  // /[\w']+/g = any word or more, also apostrophes
  const converted = text.replace(/[\w']+/g, (token) => {
    return convertToken(token);
  });
  return converted.toUpperCase();
}

function convertToken(token) {
  if (blacklist.has(token)) {
    console.log("blacklisted word: " + token);
    return token;
  }

  if (token in fixed) {
    console.log("fixed word: " + token + " is now: " + fixed[token]);
    return fixed[token];
  }

  const viableRules = [];
  for (let [pattern, transformation] of rules) {
    if (pattern.test(token)) {
      viableRules.push([pattern, transformation]);
    }
  }

  if (viableRules.length > 0) {
    console.log("these are the viable rules for: " + token);
    console.log(viableRules);
    const [pattern, transformation] = random(viableRules);
    console.log("we chose: " + [pattern, transformation]);
    console.log(
      "================================================================"
    );
    return token.replace(pattern, transformation);
  }

  return token;
}

function random(array) {
  return array[Math.floor(Math.random() * array.length)];
}

module.exports.convert = convert;
