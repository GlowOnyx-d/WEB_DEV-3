const crypto = require("crypto");

function rollDice() {
    const randomByte = crypto.randomBytes(1)[0];
    const diceValue = (randomByte % 6) + 1;
    return diceValue;
}

for (let i = 1; i <= 5; i++) {
    console.log("Roll " + i + ": Dice Rolled: " + rollDice());
}