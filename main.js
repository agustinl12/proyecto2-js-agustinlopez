document.addEventListener("DOMContentLoaded", function () {
    let carrito = [];
    let total = 0;

    const productosContainer = document.querySelectorAll(".producto");

    productosContainer.forEach(productoElement => {
        const comprarButton = productoElement.querySelector(".comprar");

        comprarButton.addEventListener("click", function () {
            const nombre = comprarButton.getAttribute("data-nombre");
            const precio = parseFloat(comprarButton.getAttribute("data-precio"));

            carrito.push({ nombre, precio });
            total += precio;

            localStorage.setItem("carrito", JSON.stringify(carrito));

            actualizarCarrito();

            Swal.fire({
                title: 'Producto Agregado',
                text: `"${nombre}" ha sido añadido al carrito.`,
                icon: 'success',
                confirmButtonText: 'OK'
            });
        });
    });

    function actualizarCarrito() {
        const carritoElement = document.getElementById("carrito");
        const totalElement = document.getElementById("total");

        carritoElement.innerHTML = "";
        carrito.forEach((item, index) => {
            const li = document.createElement("li");
            li.innerHTML = `
                ${item.nombre} - $${item.precio.toFixed(2)}
                <button data-index="${index}" class="eliminar">Eliminar</button>
                <input type="number" min="1" value="1" onchange="actualizarCantidad(${index}, this.value)">
            `;
            carritoElement.appendChild(li);
        });

        totalElement.textContent = `Total: $${total.toFixed(2)}`;

        const botonesEliminar = document.querySelectorAll(".eliminar");
        botonesEliminar.forEach(botonEliminar => {
            botonEliminar.addEventListener("click", function () {
                const index = parseInt(botonEliminar.getAttribute("data-index"));
                eliminarProducto(index);
            });
        });
    }

    function eliminarProducto(index) {
        const producto = carrito[index];
        total -= producto.precio;
        carrito.splice(index, 1);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    function actualizarCantidad(index, cantidad) {
        const producto = carrito[index];
        total -= producto.precio;
        producto.precio = parseFloat(cantidad) * producto.precio;
        total += producto.precio;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = carrito.reduce((acc, item) => acc + item.precio, 0);
        actualizarCarrito();
    }
    
    const botonPagar = document.getElementById("botonPagar");
    botonPagar.addEventListener("click", function () {
        if (carrito.length > 0) {
            
            Swal.fire({
                title: '¡Compra finalizada!',
                text: 'Gracias por tu compra.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            // Reiniciar el carrito
            carrito = [];
            total = 0;
            localStorage.setItem("carrito", JSON.stringify(carrito));
            actualizarCarrito();
        } else {
            Swal.fire({
                title: 'Carrito vacío',
                text: 'Agrega productos al carrito antes de pagar.',
                icon: 'warning',
                confirmButtonText: 'OK'
            });
        }
    });
});