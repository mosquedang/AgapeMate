// Esperamos a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', function() {

    // 1. Definimos el usuario y contraseña correctos
    // ¡RECUERDA: Esto no es seguro para un sitio real! Es solo para aprender.
    const USUARIO_DEFINIDO = "admin";
    const PASS_DEFINIDA = "1234";

    // 2. Obtenemos los elementos del HTML
    const loginForm = document.getElementById('login-form');
    const inputUsuario = document.getElementById('usuario');
    const inputPassword = document.getElementById('password');
    const parrafoMensaje = document.getElementById('mensaje');

    // 3. Escuchamos el evento "submit" (cuando se aprieta el botón "Entrar")
    loginForm.addEventListener('submit', function(evento) {
        
        // Evita que la página se recargue (comportamiento por defecto del form)
        evento.preventDefault(); 

        // 4. Obtenemos los valores que el usuario escribió
        const usuarioIngresado = inputUsuario.value;
        const passwordIngresada = inputPassword.value;

        // 5. Comparamos los valores
        if (usuarioIngresado === USUARIO_DEFINIDO && passwordIngresada === PASS_DEFINIDA) {
            
            // ¡ACCIÓN PRINCIPAL!
            // Si son correctos, redirigimos al usuario a la página principal.
            window.location.href = "index.html";

        } else {
            // Si son incorrectos
            parrafoMensaje.textContent = "Usuario o contraseña incorrectos.";
            parrafoMensaje.className = "error"; // Aplicamos la clase CSS de error
        }
    });
});