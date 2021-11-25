// CALCULATION FUNCTIONS
const add = (x, y) => x + y;
const subtract = (x, y) => x - y;
const multiply = (x, y) => x * y;
const divide = (x, y) => x / y;
const exponent = (x, y) => x ** y;
const factorial = (x) => {
  if (x < 0) {
    return null;
  }
  if (x === 0) {
    return 1;
  }
  if (x === 1) {
    return 1;
  }
  return x * factorial(x - 1);
};
const squareRoot = (x) => x ** 0.5;

const operate = (operator, x, y) => {
  if (operator === '+') {
    return add(x, y);
  }
  if (operator === '-') {
    return subtract(x, y);
  }
  if (operator === '*' || operator === '×') {
    return multiply(x, y);
  }
  if (operator === '÷' || operator === '/') {
    return divide(x, y);
  }
  if (operator === '^') {
    return exponent(x, y);
  }
  if (operator === '!') {
    return factorial(x);
  }
  if (operator === '√') {
    return squareRoot(x);
  }
  return 'Invalid operator';
};
