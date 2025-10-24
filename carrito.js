// Esperamos a que todo el HTML esté cargado
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. VARIABLES ---
    
    // Obtenemos el carrito guardado, o un array vacío si no hay nada
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Elementos de la PÁGINA del carrito (carrito.html)
    const divCarrito = document.getElementById('items-carrito'); 
    const divTotal = document.getElementById('total-carrito');
    const btnVaciar = document.getElementById('vaciar-carrito');
    const btnFinalizar = document.getElementById('finalizar-pedido'); // Botón para abrir el modal

    // Elementos del MODAL de pago (en carrito.html)
    const modalCheckout = document.getElementById('checkout-modal');
    const btnCerrarModal = document.getElementById('btn-cerrar-modal');
    const formPagoSimulado = document.getElementById('form-pago-simulado');

    // Botones de "Agregar" en productos.html
    const botonesAgregar = document.querySelectorAll('.btn-agregar');


    // --- 2. FUNCIONES ---

    // Función para guardar el carrito en el navegador
    function guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para agregar un producto al carrito
    function agregarProducto(evento) {
        // Obtenemos los 'data' del botón que fue presionado
        const producto = {
            id: evento.target.dataset.id,
            nombre: evento.target.dataset.nombre,
            precio: parseFloat(evento.target.dataset.precio),
            img: evento.target.dataset.img,
            cantidad: 1
        };

        // Buscamos si el producto ya está en el carrito
        const existe = carrito.find(item => item.id === producto.id);

        if (existe) {
            existe.cantidad++; // Si existe, sumamos 1 a la cantidad
        } else {
            carrito.push(producto); // Si no existe, lo agregamos
        }

        alert("¡Producto agregado!"); // Avisamos al usuario
        guardarCarrito(); // Guardamos cambios
    }

    // Función para MOSTRAR los productos en la página carrito.html
    function renderizarCarrito() {
        if (!divCarrito) return; // Si no estamos en carrito.html, no hagas nada
        
        divCarrito.innerHTML = ''; // Limpiamos el HTML anterior
        
        if (carrito.length === 0) {
            divCarrito.innerHTML = "<p>Tu carrito está vacío</p>";
            divTotal.innerHTML = '';
            return;
        }

        let total = 0;

        // Creamos el HTML para cada producto
        carrito.forEach(item => {
            total += item.precio * item.cantidad;
            const itemHTML = `
                <div class="item-carrito">
                    <img src="${item.img}" alt="${item.nombre}">
                    <div class="item-detalles">
                        <h4>${item.nombre}</h4>
                        <p>Cantidad: ${item.cantidad}</p>
                        <p>Precio: $${item.precio * item.cantidad}</p>
                    </div>
                </div>
            `;
            divCarrito.innerHTML += itemHTML;
        });
        
        // Mostramos el total
        divTotal.innerHTML = `<h3>Total: $${total}</h3>`;
    }

    // Función para vaciar el carrito
    function vaciarCarrito() {
        carrito = []; // Vaciamos el array
        guardarCarrito(); // Actualizamos el navegador
        renderizarCarrito(); // Volvemos a dibujar el carrito (ahora vacío)
    }

    // Función para MOSTRAR EL MODAL de pago
    function mostrarModalCheckout() {
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Agrega productos.");
            return;
        }
        if (modalCheckout) {
            modalCheckout.classList.remove('modal-oculto'); // Muestra el modal
        }
    }

    // --- 3. EVENTOS (Asignar funciones a los botones) ---

    // A. Botones "Agregar" (en productos.html)
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', agregarProducto);
    });

    // B. Botones EN la página carrito.html
    if (btnVaciar) {
        btnVaciar.addEventListener('click', vaciarCarrito);
    }
    if (btnFinalizar) {
        btnFinalizar.addEventListener('click', mostrarModalCheckout); // Llama al modal
    }

    // C. Botones DENTRO del Modal de Pago
    if (btnCerrarModal) {
        btnCerrarModal.addEventListener('click', () => {
            modalCheckout.classList.add('modal-oculto'); // Oculta el modal
        });
    }

    if (formPagoSimulado) {
        formPagoSimulado.addEventListener('submit', (evento) => {
            evento.preventDefault(); // Evita que la página se recargue

            alert("¡Compra (simulada) exitosa!\nGracias por usar Agape Mates.");
            
            modalCheckout.classList.add('modal-oculto'); // Oculta el modal
            vaciarCarrito(); // Vacía el carrito
            
            // Opcional: Redirige al inicio después de 1 segundo
            setTimeout(() => {
                window.location.href = "index.html";
            }, 1000);
        });
    }
    
    // D. Renderizar el carrito al cargar la página carrito.html
    renderizarCarrito();
});