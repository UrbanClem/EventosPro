// Registro
const regForm = document.getElementById("register-form");
if (regForm) {
  regForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("reg-username").value.trim();
    const contraseña = document.getElementById("reg-password").value.trim();
    const mensaje = document.getElementById("mensaje");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[usuario]) {
      mensaje.textContent = "❌ El usuario ya existe.";
    } else {
      usuarios[usuario] = contraseña;
      localStorage.setItem("usuarios", JSON.stringify(usuarios));
      mensaje.textContent = "✅ Usuario registrado con éxito.";
      regForm.reset();
    }
  });
}

// Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const usuario = document.getElementById("login-username").value.trim();
    const contraseña = document.getElementById("login-password").value.trim();
    const mensaje = document.getElementById("mensaje");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || {};

    if (usuarios[usuario] && usuarios[usuario] === contraseña) {
      mensaje.textContent = `🎉 ¡Bienvenido, ${usuario}!`;
      // Redireccionar a otra página si quieres: window.location.href = "inicio.html";
    } else {
      mensaje.textContent = "⚠️ Usuario o contraseña incorrectos.";
    }
  });
}
