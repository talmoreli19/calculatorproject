
var currentInput = "";
var currentOperator;
var firstOperand = null;

function updateDisplay(value) {
    var display = document.getElementById("display");
    display.value = value;
}

function handleButtonClick(event) {
    var target = event.target;
    if (!target)
        return;
    var value = target.textContent;
    if (!value)
        return;
    if (value.match(/[0-9]/)) {
        
        currentInput += value;
        updateDisplay(currentInput);
    }
    else if (value === "+" || value === "-" || value === "*" || value === "/") {
        
        if (currentInput !== "") {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = "";
                currentOperator = value;
            }
            else {
                var secondOperand = parseFloat(currentInput);
                var result = calculate(firstOperand, secondOperand, currentOperator);
                updateDisplay(result.toString());
                firstOperand = result;
                currentInput = "";
                currentOperator = value;
            }
        }
    }
    else if (value === "=") {
       
        if (currentInput !== "" && currentOperator !== null && firstOperand !== null) {
            var secondOperand = parseFloat(currentInput);
            var result = calculate(firstOperand, secondOperand, currentOperator);
            updateDisplay(result.toString());
            firstOperand = result;
            currentInput = "";
            currentOperator = "";
        }
    }
    else if (value === "C") {
        
        currentInput = "";
        firstOperand = null;
        currentOperator = "";
        updateDisplay("");
    }
}

function calculate(num1, num2, operator) {
    switch (operator) {
        case "+":
            return num1 + num2;
        case "-":
            return num1 - num2;
        case "*":
            return num1 * num2;
        case "/":
            if (num2 === 0) {
                return NaN; 
            }
            return num1 / num2;
        default:
            return NaN;
    }
}

var buttons = document.querySelectorAll(".buttons button");
buttons.forEach(function (button) {
    button.addEventListener("click", handleButtonClick);
});
