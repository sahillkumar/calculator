const buttonWrapper = document.querySelector(".buttonWrapper");
const expressionRow = document.querySelector(".expressionRow");
const resultRow = document.querySelector(".resultRow");
let firstNumber = "";
let operator;
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
  else if (className === "equals") handleEqualsInput();
});

const handleOperandInput = (inputValue) => {
  resultRow.textContent += inputValue;
};

const handleOperatorInput = (operatorInput) => {
  if (!firstNumber) {
    firstNumber = resultRow.textContent;
  } else if (!secondNumber) {
    secondNumber = resultRow.textContent;
  }

  console.info({ firstNumber, secondNumber });

  switch (operatorInput) {
    case "+":
      break;
    case "-":
      break;
    case "x":
      break;
    case "/":
      break;
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

const handleEqualsInput = () => {};

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
