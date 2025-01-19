let balance = parseFloat(localStorage.getItem('balance')) || 10000;
console.log('Saldo inicial:', balance);

function updateBalanceDisplay() {
  document.getElementById(
    'balanceDisplay'
  ).textContent = `Tu saldo actual es: $${balance}`;
}

function transferMoney(amount) {
  if (amount > balance) {
    alert(`Saldo insuficiente. Tu saldo actual es: $${balance}`);
    return false;
  }
  balance -= amount;
  localStorage.setItem('balance', balance);
  console.log('Saldo después de transferir:', balance);
  updateBalanceDisplay();
  return true;
}

function addMoney(amount) {
  balance += amount;
  localStorage.setItem('balance', balance);
  console.log('Saldo después de agregar:', balance);
  updateBalanceDisplay();
}

document
  .getElementById('showBalanceBtn')
  .addEventListener('click', updateBalanceDisplay);

document
  .getElementById('transferMoneyForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('transferAmount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, ingresa una cantidad válida para transferir.');
      return;
    }
    transferMoney(amount);
  });

document
  .getElementById('addMoneyForm')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const amount = parseFloat(document.getElementById('addAmount').value);
    if (isNaN(amount) || amount <= 0) {
      alert('Por favor, ingresa una cantidad válida para agregar.');
      return;
    }
    addMoney(amount);
  });

// Inicializa la visualización del saldo al cargar la página
updateBalanceDisplay();
