// Esperamos a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {

    // 1. Seleccionamos el botón hamburguesa
    const menuToggle = document.getElementById('menu-toggle');
    
    // 2. Seleccionamos la lista de enlaces del menú
    const navLinks = document.getElementById('nav-links');

    // 3. Añadimos un "escuchador de clics" al botón
    menuToggle.addEventListener('click', function() {
        
        // 4. Cada vez que se hace clic, "alterna" la clase 'active' en la lista de enlaces
        // Si 'active' está, la saca. Si no está, la pone.
        // El CSS se encargará de mostrar u ocultar el menú basado en esta clase.
        navLinks.classList.toggle('active');
    });

});