const buttons = Array.from(document.getElementsByTagName("button"));
const screen = document.querySelector("#screen p#text");

let hasMemory = false; // true if a number is saved in memory
let previousOperator; // if memory is present when clicked it execute the precedent operation
let memoryValue; // hold the result before clicking an operator
let hasDot = false;
let resultPrinted = false; // flag to check if the result was just printed

buttons.forEach(button => {
    button.addEventListener("click", (event) => {
        if (resultPrinted && Number.isInteger(+(button.textContent))) {
            handleOperator("AC");
            resultPrinted = false;
        }
        if (Number.isInteger(+(button.textContent))) {
            screen.textContent += button.textContent;
        } else {
            handleOperator(button.textContent);
        }
    });
});

function handleOperator(operator) {
    if (screen.textContent === "") {
        console.log("no numbers before operator");
        return;
    }
    // the operator to be checked because if user press the dot it acts as an input for the
    // operations which is incorrect
    if (hasMemory && operator != "." && operator != "+/-") {
        performOperation(previousOperator);
    } else if (operator !== "." && operator !== "AC" && operator != "+/-") { 
        // if no memory is present 
        memoryValue = parseFloat(screen.textContent);
        hasMemory = true;
        previousOperator = operator;
        screen.textContent = "";
        console.log(`memory: ${memoryValue} previousOperator: ${previousOperator}`);
        hasDot = false;
        return;
    }

    // after doing the calculations on the previous pair of number it can check the actual operator
    switch (operator) {
        case "=":
            screen.textContent = memoryValue;
            hasMemory = false;
            hasDot = false;
            resultPrinted = true;
            console.log(`memory: ${memoryValue} previousOperator: ${previousOperator}`);
            return;
        case "AC":
            screen.textContent = "";
            hasMemory = false;
            memoryValue = 0;
            previousOperator = "";
            operator = "";
            console.log(`RESET`);
            return;
        case ".":
            if (!hasDot) screen.textContent += ".";
            hasDot = true;
            return;
        case "+/-":
            screen.textContent = parseFloat(screen.textContent) * -1;
            return;
    }

    previousOperator = operator;
    screen.textContent = memoryValue;
    hasDot = false;
    console.log(`memory: ${memoryValue} previousOperator: ${previousOperator}`);
}

function round(value) {
    return Math.round(value * 1000000000) / 1000000000;
}

function performOperation(operator) {
    const currentValue = parseFloat(screen.textContent); 
    switch (operator) {
        case "+":
            memoryValue = round(memoryValue + currentValue);
            break;
        case "-":
            memoryValue = round(memoryValue - currentValue);
            break;
        case "/":
            memoryValue = round(memoryValue / currentValue);
            break;
        case "*":
            memoryValue = round(memoryValue * currentValue);
            break;
        case "%":
            memoryValue = round(memoryValue % currentValue);
            break;
    }
}