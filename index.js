const buttonWrapper = document.querySelector(".buttonWrapper");
const expressionRow = document.querySelector(".expressionRow");
const resultRow = document.querySelector(".resultRow");

DEFAULT_LAST_CLICKED_VALUE = {
  class: "",
  value: "",
};

let firstNumber = "";
let operator = "";
let secondNumber = "";
let lastClicked = { ...DEFAULT_LAST_CLICKED_VALUE };

document.addEventListener("DOMContentLoaded", () => {
  generateButtons();
  resultRow.textContent = 0;
});

document.body.addEventListener("keydown", ({ key }) => {
  let event = null;

  if (operands.includes(key)) {
    event = {
      target: {
        value: key,
        className: "operand",
      },
    };
  } else if (keyAliasOperations.includes(key)) {
    event = {
      target: {
        value: getOperatorValue(key),
        className: "operator",
      },
    };
  } else if (key === "Backspace") {
    event = {
      target: {
        value: "CE",
        className: "clearingBtn",
      },
    };
  } else if (key === "c") {
    event = {
      target: {
        value: "AC",
        className: "clearingBtn",
      },
    };
  } else if (key === "Enter") {
    event = {
      target: {
        value: "=",
        className: "equals",
      },
    };
  } else event = null;
  if (event) {
    calculatorEventHandler(event);
  }
});

const getOperatorValue = (operatorAlias) => {
  const aliasIndex = keyAliasOperations.indexOf(operatorAlias);
  return validOperations[aliasIndex];
};

buttonWrapper.addEventListener("click", calculatorEventHandler);

function calculatorEventHandler(e) {
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
  lastClicked = {
    class: className,
    value,
  };
}

const handleClearingInput = (input) => {
  if (input === "AC") clearAll();
  else if (input === "CE") clearEntry();
};

const handleOperandInput = (inputValue) => {
  if (inputValue === ".") {
    handleDecimalInput();
    return;
  }
  let resultRowStr = "";
  if (!operator) {
    if (firstNumber === "0" && inputValue === "0") firstNumber = "";
    firstNumber += inputValue;
    resultRowStr = firstNumber;
  } else {
    if (
      (secondNumber === "0" && inputValue === "0") ||
      (lastClicked.class === "operator" && lastClicked.value !== "+/-")
    ) {
      secondNumber = "";
    }
    secondNumber += inputValue;
    resultRowStr = secondNumber;
  }
  resultRow.textContent = resultRowStr;
  expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
};

const handleDecimalInput = () => {
  let inputValue = ".";
  let resultRowStr = "";
  if (!operator) {
    if (firstNumber === "" && inputValue === ".") firstNumber = "0";
    else if (
      (firstNumber ?? "").toString()?.includes(".") &&
      inputValue === "."
    )
      inputValue = "";
    firstNumber += inputValue;
    resultRowStr = firstNumber;
  } else {
    if (lastClicked.class === "operator" && lastClicked.value !== "+/-")
      secondNumber = "";
    if (secondNumber === "" && inputValue === ".") secondNumber = "0";
    else if (
      (secondNumber ?? "").toString()?.includes(".") &&
      inputValue === "."
    )
      inputValue = "";
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
    if (res === null) return;
    firstNumber = res;
    secondNumber = "";
  } else {
    firstNumber = resultRow.textContent;
  }
  operator = operation;
  expressionRow.textContent = `${firstNumber} ${operator}`;
};

const handleNegative = () => {
  if (!operator && !secondNumber) {
    if (firstNumber) {
      firstNumber = -firstNumber;
      resultRow.textContent = firstNumber;
      expressionRow.textContent = firstNumber;
    }
  } else if (secondNumber) {
    secondNumber = -secondNumber;
    resultRow.textContent = secondNumber;
    expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
  }
};

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

const trimlastChar = (num) => {
  const numStr = num.toString();
  return numStr?.substring(0, numStr.length - 1);
};

const clearEntry = () => {
  if (secondNumber) {
    secondNumber = trimlastChar(secondNumber);
    resultRow.textContent = secondNumber;
  } else if (operator) operator = "";
  else {
    firstNumber = trimlastChar(firstNumber);
    if (!firstNumber) {
      resultRow.textContent = 0;
      lastClicked = {
        ...DEFAULT_LAST_CLICKED_VALUE,
      };
    } else {
      resultRow.textContent = firstNumber;
    }
  }
  expressionRow.textContent = `${firstNumber} ${operator} ${secondNumber}`;
};

function clearAll() {
  firstNumber = "";
  secondNumber = "";
  operator = "";

  lastClicked = { ...DEFAULT_LAST_CLICKED_VALUE };
  expressionRow.textContent = "";
  resultRow.textContent = 0;
}

const handleEquals = () => {
  const result = checkAndEvaluate();
  resultRow.textContent = result ?? 0;
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
  const res = Number(a) + Number(b);
  return Number(res.toFixed(4));
}

function subtract(a, b) {
  const res = Number(a) - Number(b);
  return Number(res.toFixed(4));
}

function mulitply(a, b) {
  const res = Number(a) * Number(b);
  return Number(res.toFixed(4));
}

function divide(a, b) {
  const res = Number(a) / Number(b);
  return Number(res.toFixed(4));
}

const buttonsArray = [
  ["+/-", "%", "CE", "AC"],
  ["7", "8", "9", "/"],
  ["4", "5", "6", "x"],
  ["1", "2", "3", "-"],
  ["0", ".", "=", "+"],
];

const operands = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "."];
const validOperations = ["+/-", "%", "/", "x", "-", "+"];
const clearingOperations = ["CE", "AC"];

const keyAliasOperations = ["n", "r", "d", "m", "s", "p"];
