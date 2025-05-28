// Verificar autenticación en cada página
document.addEventListener('DOMContentLoaded', function() {
  const authToken = localStorage.getItem('authToken');
  const userData = JSON.parse(localStorage.getItem('userData') || '{}');
  
  // Actualizar navbar según estado de autenticación
  const updateNavbar = () => {
    const navAuthSection = document.getElementById('nav-auth-section');
    const navUserSection = document.getElementById('nav-user-section');
    
    if (authToken) {
      // Mostrar sección de usuario logueado
      if (navAuthSection) navAuthSection.style.display = 'none';
      if (navUserSection) {
        navUserSection.style.display = 'flex';
        document.getElementById('nav-username').textContent = userData.username || userData.email;
      }
    } else {
      // Mostrar sección de login/register
      if (navAuthSection) navAuthSection.style.display = 'flex';
      if (navUserSection) navUserSection.style.display = 'none';
    }
  };
  
  // Función para cerrar sesión
  window.cerrarSesion = function() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    window.location.href = 'index.html';
  };
  
  updateNavbar();
});