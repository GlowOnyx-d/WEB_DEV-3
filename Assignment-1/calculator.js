let args = process.argv;

let operation = args[2];
let num1 = Number(args[3]);
let num2 = Number(args[4]);

let result;

if (operation === "add") {
    result = num1 + num2;
} else if (operation === "sub") {
    result = num1 - num2;
} else if (operation === "mul") {
    result = num1 * num2;
} else if (operation === "div") {
    if (num2 === 0) {
        console.log("Error: Cannot divide by zero");
        process.exit();
    }
    result = num1 / num2;
} else {
    console.log("Invalid operation. Use add, sub, mul or div");
    process.exit();
}

console.log("Result:", result);