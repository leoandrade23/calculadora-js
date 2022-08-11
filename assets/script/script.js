const qS = (el) => document.querySelector(el);
const qSAll = (el) => document.querySelectorAll(el);

const display = qS(".display");
const numbers = qSAll("[id*=key]");
const operators = qSAll("[id*=operator]");

let newNumber = true;
let operator;
let previousNumber;

const displayUpdate = (text) => {
  if (newNumber) {
    display.textContent = text.toLocaleString("BR");
    newNumber = false;
  } else {
    display.textContent += text.toLocaleString("BR");
  }
};

const pendingOperation = () => operator !== undefined;

const calculate = () => {
  if (pendingOperation()) {
    const actualNumber = parseFloat(display.textContent.replace(",", "."));
    newNumber = true;
    switch (operator) {
      case "+":
        displayUpdate(previousNumber + actualNumber);
        break;
      case "-":
        displayUpdate(previousNumber - actualNumber);
        break;
      case "X":
        displayUpdate(previousNumber * actualNumber);
        break;
      case "÷":
        displayUpdate((previousNumber / actualNumber).toFixed(2));
        break;
    }
  }
};

const displayInsert = (event) => displayUpdate(event.target.textContent);

numbers.forEach((number) => {
  number.addEventListener("click", displayInsert);
});

const selectOperator = (event) => {
  if (!newNumber) {
    calculate();
    newNumber = true;
    operator = event.target.textContent;
    previousNumber = parseFloat(display.textContent.replace(",", "."));
  }
};

operators.forEach((operator) => {
  operator.addEventListener("click", selectOperator);
});

const equal = () => {
  calculate();
  operator = undefined;
};

qS("#equal").addEventListener("click", equal);

const clearDisplay = () => (display.textContent = "");

qS("#ce").addEventListener("click", clearDisplay);

const clearCalculate = () => {
  clearDisplay();
  operator = undefined;
  previousNumber = undefined;
  newNumber = true;
};

qS("#c").addEventListener("click", clearCalculate);

const backspace = () =>
  (display.textContent = display.textContent.slice(0, -1));

qS("#backspace").addEventListener("click", backspace);

const invert = () => {
  newNumber = true;
  displayUpdate(display.textContent * -1);
};

qS("#invert").addEventListener("click", invert);

const decimalExists = () => display.textContent.indexOf(",") !== -1;

const valueExists = () => display.textContent.length > 0;

const decimal = () => {
  if (!decimalExists()) {
    if (valueExists()) {
      displayUpdate(",");
    } else {
      displayUpdate("0,");
    }
  }
};

qS("#decimal").addEventListener("click", decimal);

const keyMap = {
  0: "key0",
  1: "key1",
  2: "key2",
  3: "key3",
  4: "key4",
  5: "key5",
  6: "key6",
  7: "key7",
  8: "key8",
  9: "key9",
  "/": "operator-division",
  "*": "operator-multiplication",
  "-": "operator-subtraction",
  "+": "operator-sum",
  Enter: "equal",
  Backspace: "backspace",
  c: "ce",
  Esc: "c",
  ",": "decimal",
};

const keyboardMap = (event) => {
  const key = event.key;
  const allowedKey = () => Object.keys(keyMap).indexOf(key) !== -1;
  if (allowedKey()) {
    document.getElementById(keyMap[key]).click();
  }
};

document.addEventListener("keyup", keyboardMap);
