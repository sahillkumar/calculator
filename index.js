const buttonWrapper = document.querySelector(".buttonWrapper");
const expressionRow = document.querySelector(".expressionRow");
const resultRow = document.querySelector(".resultRow");
let firstNumber = "";
let operator = "";
let secondNumber = "";
let lastClicked = "";

document.addEventListener("DOMContentLoaded", () => {
  generateButtons();
  resultRow.textContent = 0;
});

buttonWrapper.addEventListener("click", (e) => {
  const value = e.target.value;
  if (!value) return;
  const className = e.target.className;
  switch (className) {
    case "operand":
      handleOperandInput(value);
      break;
    case "operator":
      handleOperatorInput(value);
      break;
    case "clearingBtn":
      handleClearingInput(value);
      break;
    case "equals":
      handleEquals();
      break;
    default:
      break;
  }
  lastClicked = className;
});

const handleClearingInput = (input) => {
  if (input === "AC") clearAll();
  else if (input === "CE") clearEntry();
};

const handleOperandInput = (inputValue) => {
  let resultRowStr = "";
  if (!operator) {
    firstNumber += inputValue;
    resultRowStr = firstNumber;
  } else {
    if (lastClicked === "operator") secondNumber = "";
    secondNumber += inputValue;
    resultRowStr = secondNumber;
  }
  resultRow.textContent = resultRowStr;
  expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
};

const handleOperatorInput = (operatorInput) => {
  if (!firstNumber) {
    firstNumber = resultRow.textContent;
  }

  switch (operatorInput) {
    case "%":
      handlePercent();
      break;
    case "+/-":
      handleNegative();
      break;
    default:
      defaultArithmetricOperation(operatorInput);
      break;
  }
};

const defaultArithmetricOperation = (operation) => {
  if (operator) {
    const res = checkAndEvaluate();
    if (res) {
      firstNumber = res;
      secondNumber = "";
    }
  } else {
    firstNumber = resultRow.textContent;
  }
  operator = operation;
  expressionRow.textContent = `${firstNumber} ${operator}`;
};

const handleNegative = () => {};

const handlePercent = () => {
  if (!operator || (operator && !secondNumber)) {
    firstNumber = firstNumber / 100;
    resultRow.textContent = firstNumber;
    expressionRow.textContent = firstNumber;
    firstNumber = "";
    operator = "";
  } else {
    secondNumber = secondNumber / 100;
    resultRow.textContent = secondNumber;
    expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
  }
};

const clearEntry = () => {};

function clearAll() {
  resultRow.textContent = 0;
  firstNumber = "";
  secondNumber = "";
  operator = "";
  expressionRow.textContent = "";
}

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

const generateButtons = () => {
  buttonsArray.forEach((rowArr) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("buttonRow");
    rowArr.forEach((key) => {
      const button = addBtn(key);
      rowEl.appendChild(button);
    });
    buttonWrapper.appendChild(rowEl);
  });
};

function addBtn(key) {
  const button = document.createElement("button");
  let className;
  if (operands.includes(key)) className = "operand";
  else if (validOperations.includes(key)) className = "operator";
  else if (clearingOperations.includes(key)) className = "clearingBtn";
  else if (key === "=") className = "equals";
  else className = "";
  button.textContent = key;
  button.value = key;
  button.classList.add(className);
  return button;
}

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

const operands = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, "."];
const validOperations = ["+/-", "%", "/", "x", "-", "+"];
const clearingOperations = ["CE", "AC"];
