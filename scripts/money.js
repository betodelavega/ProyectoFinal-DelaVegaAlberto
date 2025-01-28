const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const amount = document.getElementById('amount');
const convertButton = document.getElementById('convertButton');
const result = document.getElementById('result');
const logContainer = document.createElement('div');
logContainer.id = 'logContainer';

const exchangeRates = {
  USD: { EUR: 0.91, BTC: 0.000035, ETH: 0.00052 },
  EUR: { USD: 1.1, BTC: 0.000038, ETH: 0.00057 },
  BTC: { USD: 28000, EUR: 26000, ETH: 15 },
  ETH: { USD: 1900, EUR: 1750, BTC: 0.066 },
};

const currencies = Object.keys(exchangeRates);
function populateDropdown(dropdown) {
  currencies.forEach((currency) => {
    const option = document.createElement('option');
    option.value = currency;
    option.textContent = currency;
    dropdown.appendChild(option);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  populateDropdown(fromCurrency);
  populateDropdown(toCurrency);
  document.getElementById('log').appendChild(logContainer); // Mover el contenedor de registro aquí
});

function logTransaction(type, from, to, amount, result) {
  const logEntry = document.createElement('li');
  logEntry.textContent = `${new Date().toLocaleString()} - ${type}: ${amount} ${from} to ${result} ${to}`;
  document.getElementById('logList').appendChild(logEntry);
}

function convertCurrency() {
  const from = fromCurrency.value;
  const to = toCurrency.value;
  const amountValue = parseFloat(amount.value);

  if (!from || !to || isNaN(amountValue)) {
    Swal.fire(
      'Error',
      'Por favor, complete todos los campos correctamente.',
      'error'
    );
    return;
  }

  if (!exchangeRates[from] || !exchangeRates[from][to]) {
    Swal.fire('Error', 'Tasa de conversión no disponible.', 'error');
    return;
  }

  const rate = exchangeRates[from][to];
  const convertedAmount = (amountValue * rate).toFixed(2);
  result.textContent = `${amountValue} ${from} = ${convertedAmount} ${to}`;
  logTransaction('Conversión', from, to, amountValue, convertedAmount);
  Swal.fire(
    'Éxito',
    `${amountValue} ${from} = ${convertedAmount} ${to}`,
    'success'
  );
}

const cerrarSesion = () => {
  window.location.href = '../index.html';
};

document.addEventListener('DOMContentLoaded', () => {
  const botonCerrarSesion = document.getElementById('logoutButton');
  botonCerrarSesion.addEventListener('click', cerrarSesion);
});

convertButton.addEventListener('click', convertCurrency);
