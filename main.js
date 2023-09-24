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

        const carritoElement = document.getElementById("carrito");
        const totalElement = document.getElementById("total");


        const li = document.createElement("li");
        li.textContent = `${nombre} - $${precio.toFixed(2)}`;
        carritoElement.appendChild(li);



        totalElement.textContent = `Total: $${total.toFixed(2)}`;
        console.log(`"${nombre}" ha sido añadido al carrito.`);
        console.log(`Total actual: $${total.toFixed(2)}`);
    });
});