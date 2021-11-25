/* eslint-disable arrow-body-style */
const operators = ['+', '-', '*', '/', '^', '!'];
let x = 0;
let y = 0;
let xString = '';
let yString = '';
let typingX = true;
let typingY = false;
let calcSquareRoot = false;
let operator = '';
let result = 0;

// DOM references
const numbers = document.querySelector('div.numbers');
const numButtons = document.querySelectorAll('button.numButton');
const equalButton = document.querySelector('button.equalButton');
const plusMinusButton = document.querySelector('button.plusMinusButton');
const clearButton = document.querySelector('button.clearButton');
const backspaceButton = document.querySelector('button.backspaceButton');
const operatorButtons = document.querySelectorAll('button.operatorButton');

// BUTTON CLICK HANDLERS
const handleNumPress = (e) => {
  if (e.type === 'click') {
    if (typingX) {
      xString += e.target.textContent;
      x = Number(xString);
      console.log('x is ', x);
      numbers.textContent = x;
    }
    if (typingY) {
      yString += e.target.textContent;
      y = Number(yString);
      numbers.textContent = xString + ' ' + operator + ' ' + yString;
    }
  }
  if (e.type === 'keydown') {
    if (typingX) {
      xString += e.key;
      x = Number(xString);
      numbers.textContent = x;
    }
    if (typingY) {
      yString += e.key;
      y = Number(yString);
      numbers.textContent = xString + ' ' + operator + ' ' + yString;
    }
  }
};
numButtons.forEach((numButton) => { numButton.addEventListener('click', handleNumPress); });
document.addEventListener('keydown', (e) => {
  if (Number(e.key)) { handleNumPress(e); }
});

const handleOperatorPress = (e) => {
  if (e.type === 'click') {
    operator = e.target.textContent;
  }
  if (e.type === 'keydown') {
    operator = e.key;
  }
  if (operator === '√') {
    calcSquareRoot = true;
  }
  if (typingX) {
    typingX = false;
    typingY = true;
    if (operator !== '!') {
      numbers.textContent = xString + ' ' + operator + ' ';
    } else {
      numbers.textContent = xString + operator;
    }
  }
  if (typingY) {
    // TODO: Evaluate and display result of X operate Y
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
    xString = '-' + xString;
    x = -x;
    numbers.textContent = x;
  }
  if (typingY) {
    yString = '-' + yString;
    y = -y;
    numbers.textContent = y;
  }
};
plusMinusButton.addEventListener('click', handlePlusMinusPress);

const handleEqualPress = () => {
  if (calcSquareRoot) {
    result = operate(operator, x);
    x = result;
    xString = x.toString();
    numbers.textContent = x;
  }
  if (typingX) {
    numbers.textContent = x;
    // resultDisplayed = true;
  }
  if (typingY) {
    // Set x equal to result, display x
    result = operate(operator, x, y);
    x = result;
    xString = x.toString();
    typingX = true;
    numbers.textContent = x;
    // Reset y
    y = 0;
    yString = '';
    typingY = false;
  }
};
equalButton.addEventListener('click', handleEqualPress);
document.addEventListener('keydown', (e) => {
  if (e.key === '=') { handleEqualPress(); }
});

const handleBackspacePress = () => {
  if (typingX) {
    xString = xString.slice(0, xString.length - 1);
    x = Number(xString);
    numbers.textContent = x;
  }
  if (typingY) {
    yString = yString.slice(0, yString.length - 1);
    y = Number(yString);
    numbers.textContent = y;
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
  numbers.textContent = x;
};
clearButton.addEventListener('click', handleClearPress);

// Initialize display
numbers.textContent = x;
