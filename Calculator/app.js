const numberButtons = document.querySelectorAll("[data-number");
const operationsButtons = document.querySelectorAll("[data-operation]");
const equalButton = document.querySelector("[data-equal]");
const deleteButton = document.querySelector("[data-delete]");
const clearAllButton = document.querySelector("[data-clear-all]");
const topDisplay = document.querySelector("[data-top-display]");
const bottomDisplay = document.querySelector("[data-bottom-display]");

class Calculator {
  constructor(topDisplay, bottomDisplay) {
    this.topDisplay = topDisplay;
    this.bottomDisplay = bottomDisplay;
    this.clearAll();
    this.reset = false;
  }

  clearAll() {
    this.currentOperand = "";
    this.previousOperand = "";
    this.operation = undefined;
  }

  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === "." && this.currentOperand.includes(".")) return;
    this.currentOperand += number.toString();
  }

  chooseOperation(operation) {
    if (this.currentOperand === "") return;
    if (this.previousOperand !== "") {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = "";
  }

  compute() {
    let computation;
    const prev = Number(this.previousOperand);
    const current = Number(this.currentOperand);
    if (isNaN(prev) || isNaN(current)) return;
    switch (this.operation) {
      case "+":
        computation = prev + current;
        break;
      case "-":
        computation = prev - current;
        break;
      case "x":
        computation = prev * current;
        break;
      case "/":
        computation = prev / current;
        break;
      default:
        return;
    }
    this.reset = true
    this.currentOperand = computation;
    this.operation = undefined;
    this.previousOperand = "";
  }

  updateDisplay() {
    this.bottomDisplay.innerText = this.currentOperand;
    if (this.operation != null) {
      this.topDisplay.innerText = `${this.previousOperand} ${this.operation}`;
    } else {
      this.topDisplay.innerText = "";
    }
  }
}

const calculator = new Calculator(topDisplay, bottomDisplay);

numberButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (calculator.previousOperand === '' && calculator.currentOperand !== '' && calculator.reset ) {
      calculator.currentOperand = '';
      calculator.reset = false;
    }
    calculator.appendNumber(button.innerText);
    calculator.updateDisplay();
  });
});

operationsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    calculator.chooseOperation(button.innerText);
    calculator.updateDisplay();
  });
});

equalButton.addEventListener("click", () => {
  calculator.compute();
  calculator.updateDisplay();
});

clearAllButton.addEventListener("click", () => {
  calculator.delete();
  calculator.updateDisplay();
});

deleteButton.addEventListener("click", () => {
  calculator.clearAll();
  calculator.updateDisplay();
});
