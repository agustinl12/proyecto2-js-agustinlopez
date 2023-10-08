//innnerHtml: debuelve el contenido de una etiqueta html

// let div = document.getElementById("app");
// let parrafo = document.getElementById("parrafo1");
// // console.log(div.innerHTML);
// console.log(parrafo.innerHTML);

// let productos= document.getElementsByClassName("product");
// console.log(productos);
// console.log(productos[0].innerHTML);
// console.log(productos[1].innerHTML);
// console.log(productos[2].innerHTML);

let carrito = [];
let total = 0;

const botonesAgregar = document.querySelectorAll(".product button");

botonesAgregar.forEach(boton => {
    boton.addEventListener("click", () => {
        const nombre = boton.getAttribute("data-nombre");
        const precio = parseFloat(boton.getAttribute("data-precio"));

        carrito.push({ nombre, precio });
        total += precio;

        localStorage.setItem("carrito", JSON.stringify(carrito));

        actualizarCarrito();

        // Agregar una alerta para notificar al usuario
        alert(`"${nombre}" ha sido añadido al carrito.`);
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
                <button onclick="eliminarProducto(${index})">Eliminar</button>
                <input type="number" min="1" value="1" onchange="actualizarCantidad(${index}, this.value)">
            `;
        carritoElement.appendChild(li);
    });

    totalElement.textContent = `Total: $${total.toFixed(2)}`;
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

const carritoGuardado = JSON.parse(localStorage.getItem("carrito"));
if (carritoGuardado) {
    carrito = carritoGuardado;
    total = carrito.reduce((acc, item) => acc + item.precio, 0);
    actualizarCarrito();
}