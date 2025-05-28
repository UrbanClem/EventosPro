// Registro 
const regForm = document.getElementById("register-form");
if (regForm) {
  regForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const username = document.getElementById("reg-username").value.trim();
    const email = document.getElementById("reg-email").value.trim();
    const password = document.getElementById("reg-password").value.trim();
    const confirmPassword = document.getElementById("reg-confirm-password").value.trim();
    const userType = document.querySelector('input[name="user-type"]:checked')?.value;
    const mensaje = document.getElementById("mensaje") || document.getElementById("registerResult");

    // Validaciones mejoradas
    if (!username || !email || !password || !confirmPassword || !userType) {
      mensaje.textContent = "❌ Por favor complete todos los campos.";
      mensaje.style.color = "red";
      return;
    }

    if (password !== confirmPassword) {
      mensaje.textContent = "❌ Las contraseñas no coinciden.";
      mensaje.style.color = "red";
      return;
    }

    if (password.length < 6) {
      mensaje.textContent = "❌ La contraseña debe tener al menos 6 caracteres.";
      mensaje.style.color = "red";
      return;
    }

    // Determinar el valor admin según el tipo de usuario
    const adminValue = userType === "Participant" ? 0 : 1;

    try {
      const response = await fetch('http://localhost:3000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          username, 
          email, 
          password,
          admin: adminValue
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {
        mensaje.textContent = "✅ Usuario registrado con éxito. Redirigiendo...";
        mensaje.style.color = "green";
        regForm.reset();
        
        setTimeout(() => {
          window.location.href = 'login.html';
        }, 2000);
      } else {
        mensaje.textContent = result.error || "❌ Error al registrar usuario.";
        mensaje.style.color = "red";
      }
    } catch (error) {
      console.error('Error:', error);
      mensaje.textContent = "❌ Error de conexión con el servidor.";
      mensaje.style.color = "red";
    }
  });
}


//Login
const loginForm = document.getElementById("login-form");
if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();
    const email = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const mensaje = document.getElementById("mensaje");

    // Validación básica de campos
    if (!email || !password) {
      mensaje.textContent = "⚠️ Por favor complete todos los campos.";
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      
      const result = await response.json();
      
      if (response.ok) {        
        if (result.success) {
          alert("¡Sesión iniciada correctamente!");
          mensaje.textContent = "";
          loginForm.reset();
          
          // Guardar token o datos de usuario si es necesario
          if (result.token) {
            localStorage.setItem('authToken', result.token);
            localStorage.setItem('userData', JSON.stringify(result.user));
          }
          
          // Redirección según el campo admin
          if (result.admin === 0) {
            window.location.href = 'part.html';
          } else if (result.admin === 1) {
            window.location.href = 'organ.html';
          } else if (result.admin === 2) {
            window.location.href = 'admin.html';
          }
        } else {
          mensaje.textContent = result.message || "⚠️ Credenciales incorrectas.";
        }
      } else {
        mensaje.textContent = result.message || "⚠️ Error al iniciar sesión.";
      }
    } catch (error) {
      console.error('Error:', error);
      mensaje.textContent = "❌ Error de conexión con el servidor.";
    }

    // Verificar si ya está logueado al cargar la página
    if (localStorage.getItem('authToken')) {
      const user = JSON.parse(localStorage.getItem('userData'));
      if (user.admin === 0) {
        window.location.href = 'part.html';
      } else if (user.admin === 1) {
        window.location.href = 'organ.html';
      } else if (user.admin === 2) {
        window.location.href = 'admin.html';
      }
    }
  });
}