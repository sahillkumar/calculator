const buttonWrapper = document.querySelector(".buttonWrapper");

document.addEventListener("DOMContentLoaded", () => {
  generateButtons();
});

const generateButtons = () => {
  buttonsArray.forEach((key) => {
    const button = document.createElement("button");
    button.textContent = key;
    buttonWrapper.appendChild(button);
  });
};

const buttonsArray = [
  "(",
  ")",
  "%",
  "AC",
  7,
  8,
  9,
  "/",
  4,
  5,
  6,
  "x",
  1,
  2,
  3,
  "-",
  0,
  ".",
  "=",
  "+",
];
