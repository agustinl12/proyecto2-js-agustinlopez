document.addEventListener("DOMContentLoaded", function () {
    let carrito = [];
    let total = 0;

    // Cargar datos de productos utilizando Fetch
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            const productosContainer = document.getElementById("productos-container");

            data.forEach(producto => {
                const productoElement = document.createElement("div");
                productoElement.classList.add("product");
                productoElement.innerHTML = `
                    <img src="./img/${producto.imagen}" alt="${producto.nombre}">
                    <h2>${producto.nombre}</h2>
                    <p>${producto.descripcion}</p>
                    <p>Precio: $${producto.precio.toFixed(2)}</p>
                    <button data-nombre="${producto.nombre}" data-precio="${producto.precio}" class="comprar">Añadir al carrito</button>
                `;

                // Agregar evento para añadir productos al carrito
                const botonComprar = productoElement.querySelector("button.comprar");
                botonComprar.addEventListener("click", function () {
                    const nombre = botonComprar.getAttribute("data-nombre");
                    const precio = parseFloat(botonComprar.getAttribute("data-precio"));

                    carrito.push({ nombre, precio });
                    total += precio;

                    localStorage.setItem("carrito", JSON.stringify(carrito));

                    // Actualizar el carrito
                    actualizarCarrito();

                    Swal.fire({
                        title: 'Producto Agregado',
                        text: `"${nombre}" ha sido añadido al carrito.`,
                        icon: 'success',
                        confirmButtonText: 'OK'
                    });
                });

                productosContainer.appendChild(productoElement);
            });
        })
        .catch(error => console.error('Error al cargar los datos: ', error));

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

        // Asociar eventos de clic a los botones "Eliminar"
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
        producto.precio *= cantidad;
        total += producto.precio;
        localStorage.setItem("carrito", JSON.stringify(carrito));
        actualizarCarrito();
    }

    // Recuperar el carrito desde el almacenamiento local al cargar la página
    const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
    if (carritoGuardado) {
        carrito = carritoGuardado;
        total = carrito.reduce((acc, item) => acc + item.precio, 0);
        actualizarCarrito();
    }
});