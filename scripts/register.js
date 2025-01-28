import { addItem, getItemById } from './database.js';

const registerForm = document.getElementById('registerForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const dniInput = document.getElementById('dni');
const togglePasswordButton = document.getElementById('togglePassword'); // Nuevo elemento

function isValidPassword(password) {
  const regex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  return regex.test(password);
}

function togglePasswordVisibility() {
  const type = passwordInput.type === 'password' ? 'text' : 'password';
  passwordInput.type = type;
  togglePasswordButton.textContent =
    type === 'password' ? 'Mostrar contraseña' : 'Ocultar contraseña';
}

async function register(event) {
  event.preventDefault(); // Prevenir el envío del formulario por defecto

  const username = usernameInput.value;
  const password = passwordInput.value;
  const dni = dniInput.value;

  console.log('Datos de registro:', { username, password, dni }); // Verificar datos de entrada

  if (!isValidPassword(password)) {
    Swal.fire(
      'Error',
      'La contraseña debe tener al menos 6 caracteres, incluyendo letras y números.',
      'error'
    );
    return;
  }

  const existingUser = getItemById(username, 'users');
  if (existingUser) {
    Swal.fire('Error', 'El usuario ya existe.', 'error');
    return;
  }

  const newUser = { id: username, password, dni };
  addItem(newUser, 'users');
  console.log('Usuario registrado:', newUser); // Verificar usuario registrado

  // Verificar si el registro se ha creado en la base de datos
  const createdUser = getItemById(username, 'users');
  console.log('Usuario creado en la base de datos:', createdUser);

  Swal.fire('Éxito', 'Registro exitoso en la base de datos.', 'success').then(
    () => {
      window.location.href = '../index.html'; // Redirigir a la página de inicio
    }
  );
}

registerForm.addEventListener('submit', register);
togglePasswordButton.addEventListener('click', togglePasswordVisibility); // Nuevo evento
