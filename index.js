const calcHistory = document.getElementById('calcHistory');
const currentDisplay = document.getElementById('currentDisplay');

let currentValue = '';
let lastValue = '';
let lastOperation = '';

const reset = () => {
  currentValue = '';
  lastValue = '';
  lastOperation = '';
  calcHistory.innerHTML = '';
  currentDisplay.innerHTML = '';
};

const addDigit = digit => {
  const positiveCurrentValue = currentValue.startsWith('-') ? currentValue.substring(1) : currentValue;

  if (digit === '.') {
    if (positiveCurrentValue.includes('.')) return;
    if (positiveCurrentValue === '') currentValue += '0';
  }

  if (positiveCurrentValue === '0' && digit !== '.') currentValue += '.';

  currentValue += digit;
  currentDisplay.innerHTML = currentValue;
};

const operation = sign => {
  if (currentValue === '' && lastValue === '') return;

  if (lastOperation !== '' && currentDisplay !== '') {
    calculate();
    lastOperation = sign;
    calcHistory.innerHTML = `${lastValue} ${lastOperation}`;
    return;
  }

  lastOperation = sign;
  if (currentValue !== '') lastValue = currentValue;
  currentValue = '';
  currentDisplay.innerHTML = currentValue;
  calcHistory.innerHTML = `${lastValue} ${lastOperation}`;
};

const removeDigit = () => {
  currentValue = currentValue.slice(0, -1);

  if (currentValue === '-') currentValue = '';
  currentDisplay.innerHTML = currentValue;
};

const calculate = () => {
  if (lastValue === '' || currentValue === '') return;

  const x1 = parseFloat(lastValue);
  const x2 = parseFloat(currentValue);

  let result = 0;
  switch (lastOperation) {
    case '+': {
      result = x1 + x2;
      break;
    }
    case '-': {
      result = x1 - x2;
      break;
    }
    case '×': {
      result = x1 * x2;
      break;
    }
    case '÷': {
      if (x2 === 0) {
        reset();
        alert('Cannot divide by 0...');
        return;
      }
      result = x1 / x2;
      break;
    }
  }

  const fixed = result.toFixed(5);
  lastValue = fixed - result === 0 ? result : fixed;
  currentValue = '';
  lastOperation = '';

  calcHistory.innerHTML = `= ${lastValue}`;
  currentDisplay.innerHTML = currentValue;
};

const plusMinus = () => {
  if (currentValue !== '') {
    currentValue = `-${currentValue}`;
    currentDisplay.innerHTML = currentValue;
  }
};
