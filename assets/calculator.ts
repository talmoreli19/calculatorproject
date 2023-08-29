


let currentInput: string = "";
let currentOperator: string;
let firstOperand: number | null = null;

function updateDisplay(value: string) {
    const display = document.getElementById("display") as HTMLInputElement;
    display.value = value;
}


function handleButtonClick(event: MouseEvent) {
    const target = event.target as HTMLButtonElement | null;

    if (!target) return;

    const value = target.textContent;

    if (!value) return;

    if (value.match(/[0-9]/)) {
        
        currentInput += value;
        updateDisplay(currentInput);
    } else if (value === "+" || value === "-" || value === "*" || value === "/") {
        
        if (currentInput !== "") {
            if (firstOperand === null) {
                firstOperand = parseFloat(currentInput);
                currentInput = "";
                currentOperator = value;
            } else {
                
                const secondOperand = parseFloat(currentInput);
                const result: number = calculate(firstOperand, secondOperand, currentOperator);
                updateDisplay(result.toString());
                firstOperand = result;
                currentInput = "";
                currentOperator = value;
            }
        }
    } else if (value === "=") {
        
        if (currentInput !== "" && currentOperator !== null && firstOperand !== null) {
            const secondOperand = parseFloat(currentInput);
            const result: number = calculate(firstOperand, secondOperand, currentOperator);
            updateDisplay(result.toString());
            firstOperand = result;
            currentInput = "";
            currentOperator = "";
        }
    } else if (value === "C") {
        
        currentInput = "";
        firstOperand = null;
        currentOperator = "";
        updateDisplay("");
    }
}

function calculate(num1: number, num2: number, operator: string): number {
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


const buttons = document.querySelectorAll(".buttons button") as NodeListOf<HTMLButtonElement>;
buttons.forEach(button => {
    button.addEventListener("click", handleButtonClick);
});
