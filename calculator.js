/* elements */
const numbers = document.querySelectorAll(".calculator__button--number");
const operators = document.querySelectorAll(".calculator__button--operator");
const equals = document.querySelector("#equals");
const clear = document.querySelector("#clear");
const display = document.querySelector("#display");

/* listeners */
numbers.forEach(number => {
  number.addEventListener("click", handleNumberInput);
});
operators.forEach(operator => {
  operator.addEventListener("click", handleOperatorInput);
});
equals.addEventListener("click", handleCalculate);
clear.addEventListener("click", handleClear);

/* state */
const state = {
  result: null,
  operator: null,
  newInput: true,
  lastKeyOperator: false
};

/* behavior */
function handleNumberInput() {
  if (state.newInput) {
    this.dataset.value === "."
      ? (display.innerHTML = "0")
      : (display.innerHTML = "");
    state.newInput = false;
  }

  const cur = display.innerHTML;
  switch (this.dataset.value) {
    case ".":
      if (!cur.includes(".")) display.append(this.dataset.value);
      break;
    default:
      !(parseInt(cur[0]) || cur[0] === "" || cur.includes("."))
        ? (display.innerHTML = this.dataset.value)
        : display.append(this.dataset.value);
  }

  state.lastKeyOperator = false;
}

function handleOperatorInput() {
  /* coerce dataset value into a function */
  const operation = window[this.dataset.value];

  if (state.lastKeyOperator) {
    state.operator = operation;
  } else if (state.operator) {
    state.result = calculate(state.operator);
    state.operator = operation;
    display.innerHTML = state.result;
  } else {
    state.operator = operation;
    state.result = parseFloat(display.innerHTML);
  }
  state.lastKeyOperator = true;
  state.newInput = true;
}

function handleCalculate() {
  if (state.operator) {
    state.result = calculate(state.operator);
    display.innerHTML = state.result;
    state.operator = null;
  }
  state.newInput = true;
  state.lastKeyOperator = false;
}

function handleClear() {
  state.result = null;
  state.operator = null;
  state.newInput = true;
  state.lastKeyOperator = false;
  display.innerHTML = 0;
}

/* functions */
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const divide = (a, b) => a / b;
const multiply = (a, b) => a * b;
const calculate = operation =>
  operation(parseFloat(state.result), parseFloat(display.innerHTML));
