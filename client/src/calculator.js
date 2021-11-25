/* eslint-disable arrow-body-style */
const add = (x, y) => {
  return x + y;
};

const subtract = (x, y) => {
  return x - y;
};

const multiply = (x, y) => {
  return x * y;
};

const divide = (x, y) => {
  return x / y;
};

const operate = (operator, x, y) => {
  if (operator === '+') {
    return add(x, y);
  }
  if (operator === '-') {
    return subtract(x, y);
  }
  if (operator === '*') {
    return multiply(x, y);
  }
  if (operator === '/') {
    return divide(x, y);
  }
  return 'Invalid operator';
};
