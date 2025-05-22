document.addEventListener('DOMContentLoaded', function() {
  // Función para cargar las sedes
  async function cargarSedes() {
    try {
      const response = await fetch('http://localhost:3000/api/sede');
      if (!response.ok) {
        throw new Error('Error al cargar sedes');
      }
      const sedes = await response.json();
      
      const selectSede = document.getElementById('venueSelect');
      selectSede.innerHTML = '<option value="" disabled selected>Seleccione una sede</option>';
      
      sedes.forEach(sede => {
        const option = document.createElement('option');
        option.value = sede.id;
        option.textContent = `${sede.nombre} (Capacidad: ${sede.capacidad})`;
        selectSede.appendChild(option);
      });
      
    } catch (error) {
      console.error('Error:', error);
      document.getElementById('venueSelect').innerHTML = '<option value="" disabled selected>Error al cargar sedes</option>';
    }
  }

  // Cargar sedes al iniciar la página
  cargarSedes();
});