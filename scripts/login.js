import { getItemById } from './database.js';

const loginButton = document.getElementById('loginButton');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const togglePasswordButton = document.getElementById('togglePassword');

async function login(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  const username = usernameInput.value;
  const password = passwordInput.value;

  const user = getItemById(username, 'users');
  if (!user || user.password !== password) {
    Swal.fire('Error', 'Credenciales incorrectas.', 'error');
    return;
  }

  Swal.fire('Éxito', 'Inicio de sesión exitoso.', 'success').then(() => {
    window.location.href = './pages/conversion.html'; // Redirigir a la página de conversión
  });
}

function togglePassword() {
  const type =
    passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
  passwordInput.setAttribute('type', type);
  togglePasswordButton.textContent =
    type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña';
}

loginButton.addEventListener('click', login);
togglePasswordButton.addEventListener('click', togglePassword);

passwordInput.addEventListener('keypress', function (event) {
  if (event.key === 'Enter') {
    login(event);
  }
});
