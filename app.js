const isEven = require("./modules/isEven");
const logMessage = require("./modules/logger");

logMessage("Program started");

let number = 10;

if (isEven(number)) {
    logMessage(number + " is even");
} else {
    logMessage(number + " is odd");
}

logMessage("Program ended");