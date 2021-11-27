/* eslint-disable no-undef */
/* eslint-disable arrow-body-style */
const operators = ['+', '-', '*', '/', '^', '!'];
let x = 0;
let y = 0;
let xString = '';
let yString = '';
let xInfinity = false;
let yInfinity = false;
// let xStringDisplayed = '';
// let yStringDisplayed = '';
let typingX = true;
let typingY = false;
let typingDecimal = false;
// let calcSquareRoot = false;
let operator = '';
let result = 0;

// DOM references
const numbers = document.querySelector('div.numbers');
const numButtons = document.querySelectorAll('button.numButton');
const equalButton = document.querySelector('button.equalButton');
const plusMinusButton = document.querySelector('button.plusMinusButton');
const decimalButton = document.querySelector('button.decimalButton');
const clearButton = document.querySelector('button.clearButton');
const backspaceButton = document.querySelector('button.backspaceButton');
const operatorButtons = document.querySelectorAll('button.operatorButton');

const checkNumberRange = () => {
  if (x > Number.MAX_SAFE_INTEGER) {
    x = Infinity;
    xInfinity = true;
    xString = '∞';
  }
  if (y > Number.MAX_SAFE_INTEGER) {
    y = Infinity;
    yInfinity = true;
    yString = '∞';
  }
};

// BUTTON CLICK HANDLERS
const handleNumPress = (e) => {
  if (e.type === 'click') {
    if (typingX) {
      if (!xInfinity) {
        xString += e.target.id;
        x = Number(xString);
        if (xString.length > 10) {
          xString = x.toExponential().toString();
        }
        checkNumberRange();
        numbers.textContent = xString;
      }
    }
    if (typingY) {
      if (!yInfinity) {
        yString += e.target.id;
        y = Number(yString);
        checkNumberRange();
        numbers.textContent = `${xString} ${operator} ${yString}`;
      }
    }
  }
  if (e.type === 'keydown') {
    if (typingX) {
      if (!xInfinity) {
        xString += e.key;
        x = Number(xString);
        checkNumberRange();
        if (xString.length > 10) {
          xString = x.toExponential().toString();
        }
        numbers.textContent = xString;
      }
    }
    if (typingY) {
      if (!yInfinity) {
        yString += e.key;
        y = Number(yString);
        checkNumberRange();
        numbers.textContent = `${xString} ${operator} ${yString}`;
      }
    }
  }
};
numButtons.forEach((numButton) => { numButton.addEventListener('click', handleNumPress); });
document.addEventListener('keydown', (e) => {
  // eslint-disable-next-line no-restricted-globals
  if (isFinite(e.key)) { handleNumPress(e); }
});

const handleEqualPress = () => {
  if (typingX) {
    numbers.textContent = xString;
  }
  if (typingY) {
    // Set x equal to result, display x
    result = operate(operator, x, y);
    x = Math.round(result * 10000000000) / 10000000000;
    xString = x.toString();
    typingX = true;
    numbers.textContent = xString;
    // Reset y
    y = 0;
    yString = '';
    typingY = false;
  }
};
equalButton.addEventListener('click', handleEqualPress);
document.addEventListener('keydown', (e) => {
  if (e.key === '=' || e.key === 'Enter') { handleEqualPress(); }
});

const handleOperatorPress = (e) => {
  if (e.type === 'click') {
    operator = e.target.textContent;
  }
  if (e.type === 'keydown') {
    operator = e.key;
  }
  if (typingX) {
    typingX = false;
    typingY = true;
    if (operator === '!') {
      numbers.textContent = xString + operator;
    } else if (operator === '√') {
      numbers.textContent = `sqrt(${xString})`;
    } else {
      numbers.textContent = `${xString} ${operator} `;
    }
  }
  if (typingY) {
    // TODO: Evaluate and display result of X operate Y
    // handleEqualPress();
    // TODO: Set X equal to the result
  }
};
operatorButtons.forEach((operatorButton) => {
  operatorButton.addEventListener('click', handleOperatorPress);
});
document.addEventListener('keydown', (e) => {
  if (operators.includes(e.key)) { handleOperatorPress(e); }
});

const handlePlusMinusPress = () => {
  if (typingX) {
    xString = `-${xString}`;
    x = -x;
    numbers.textContent = xString;
  }
  if (typingY) {
    yString = `-${yString}`;
    y = -y;
    numbers.textContent = yString;
  }
};
plusMinusButton.addEventListener('click', handlePlusMinusPress);

const handleDecimalPress = () => {
  if (!typingDecimal) {
    typingDecimal = true;
    if (typingX) {
      xString += '.';
      x = Number(xString);
      checkNumberRange();
      numbers.textContent = xString;
    }
    if (typingY) {

    }
  }
};
decimalButton.addEventListener('click', handleDecimalPress);
document.addEventListener('keydown', (e) => {
  if (e.key === '.') { handleDecimalPress(); }
});

const handleBackspacePress = () => {
  if (typingX) {
    xString = xString.slice(0, xString.length - 1);
    x = Number(xString);
    numbers.textContent = xString;
  }
  if (typingY) {
    yString = yString.slice(0, yString.length - 1);
    y = Number(yString);
    numbers.textContent = yString;
  }
};
backspaceButton.addEventListener('click', handleBackspacePress);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Backspace') { handleBackspacePress(); }
});

const handleClearPress = () => {
  xString = '';
  yString = '';
  x = 0;
  y = 0;
  typingX = true;
  typingY = false;
  typingDecimal = false;
  numbers.textContent = xString;
};
clearButton.addEventListener('click', handleClearPress);

// Initialize display
numbers.textContent = xString;
