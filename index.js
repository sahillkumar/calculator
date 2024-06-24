const buttonWrapper = document.querySelector(".buttonWrapper");
const expressionRow = document.querySelector(".expressionRow");
const resultRow = document.querySelector(".resultRow");
let firstNumber = "";
let operator = "";
let secondNumber = "";

document.addEventListener("DOMContentLoaded", () => {
  generateButtons();
  resultRow.textContent = 0;
});

buttonWrapper.addEventListener("click", (e) => {
  const value = e.target.value;
  if (!value) return;
  const className = e.target.className;
  if (className === "operand") handleOperandInput(value);
  else if (className === "operator") handleOperatorInput(value);
  else if (className === "equals") handleEquals();
});

const handleOperandInput = (inputValue) => {
  if (!operator) {
    firstNumber += inputValue;
    resultRow.textContent = firstNumber;
  } else {
    secondNumber += inputValue;
    resultRow.textContent = secondNumber;
  }
  expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
};

const defaultOperationFlow = (operatorInput) => {
  if (!firstNumber) {
    firstNumber = resultRow.textContent;
  }
  if (operator) {
    const result = checkAndEvaluate();
    if (result) {
      resultRow.textContent = result;
      expressionRow.textContent = result;
      firstNumber = result;
      secondNumber = "";
    }
  }
  operator = operatorInput;
  expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
};

const handleOperatorInput = (operatorInput) => {
  switch (operatorInput) {
    case "AC":
      clearAll();
      break;
    case "CE":
      clearEntry();
      break;
    default:
      defaultOperationFlow(operatorInput);
      break;
  }
};

const clearEntry = () => {};

const handleEquals = () => {
  const result = checkAndEvaluate();
  resultRow.textContent = result;
  expressionRow.textContent = result;
  firstNumber = "";
  operator = "";
  secondNumber = "";
};

const checkAndEvaluate = () => {
  if (firstNumber && secondNumber && operator) {
    return evalauate(firstNumber, secondNumber, operator);
  }
  return null;
};

const evalauate = (a, b, op) => {
  switch (op) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "x":
      return mulitply(a, b);
    case "/":
      return divide(a, b);
    case "+/-":
      break;
    case "%":
      break;
    case "CE":
      break;
    case "AC":
    default:
      break;
  }
};

const clearAll = () => {
  resultRow.textContent = 0;
  firstNumber = "";
  secondNumber = "";
  operator = "";
  expressionRow.textContent = "";
};

const generateButtons = () => {
  buttonsArray.forEach((rowArr, i) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("buttonRow");
    rowArr.forEach((key, j) => {
      const button = document.createElement("button");
      let className;
      if (i === 0 || j === rowArr.length - 1) className = "operator";
      else if (key === "=") className = "equals";
      else className = "operand";
      button.textContent = key;
      button.value = key;
      button.classList.add(className);
      rowEl.appendChild(button);
    });
    buttonWrapper.appendChild(rowEl);
  });
};

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function mulitply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

const buttonsArray = [
  ["+/-", "%", "CE", "AC"],
  [7, 8, 9, "/"],
  [4, 5, 6, "x"],
  [1, 2, 3, "-"],
  [0, ".", "=", "+"],
];
