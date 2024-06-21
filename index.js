const buttonWrapper = document.querySelector(".buttonWrapper");
const prevExp = document.querySelector("prevExp");
const currentAns = document.querySelector("currentAns");

document.addEventListener("DOMContentLoaded", () => {
  generateButtons();
});

buttonWrapper.addEventListener("click", ({ target: { value } }) => {
  if (!value) return;
  console.info({ value });
});

const generateButtons = () => {
  buttonsArray.forEach((rowArr, i) => {
    const rowEl = document.createElement("div");
    rowEl.classList.add("buttonRow");
    rowArr.forEach((key, j) => {
      const button = document.createElement("button");
      let id;
      if (i === 0 || j === rowArr.length - 1) id = "operator";
      else if (key === "=") id = "equals";
      else id = "operand";
      button.textContent = key;
      button.value = key;
      button.id = id;
      rowEl.appendChild(button);
    });
    buttonWrapper.appendChild(rowEl);
  });
};

const buttonsArray = [
  ["+/-", "%", "CE", "AC"],
  [7, 8, 9, "/"],
  [4, 5, 6, "x"],
  [1, 2, 3, "-"],
  [0, ".", "=", "+"],
];
