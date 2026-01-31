let total = 0;

function agregarAlCarrito(producto, precio) {
    const lista = document.getElementById("lista-carrito");
    const item = document.createElement("li");

    item.textContent = producto + " - $" + precio;
    lista.appendChild(item);

    total += precio;
    document.getElementById("total").textContent = total;
}

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function agregarAlCarrito(nombre, precio) {
    const producto = carrito.find(item => item.nombre === nombre);

    if (producto) {
        producto.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }

    guardarCarrito();
    mostrarCarrito();
}

function eliminarProducto(nombre) {
    carrito = carrito.filter(item => item.nombre !== nombre);
    guardarCarrito();
    mostrarCarrito();
}

function cambiarCantidad(nombre, nuevaCantidad) {
    const producto = carrito.find(item => item.nombre === nombre);
    producto.cantidad = parseInt(nuevaCantidad);
    guardarCarrito();
    mostrarCarrito();
}

function mostrarCarrito() {
    const lista = document.getElementById("lista-carrito");
    const totalHTML = document.getElementById("total");

    lista.innerHTML = "";
    let total = 0;

    carrito.forEach(item => {
        total += item.precio * item.cantidad;

        lista.innerHTML += `
            <tr>
                <td>${item.nombre}</td>
                <td>
                    <input type="number" min="1" value="${item.cantidad}"
                    onchange="cambiarCantidad('${item.nombre}', this.value)">
                </td>
                <td>$${item.precio * item.cantidad}</td>
                <td>
                    <button class="eliminar" onclick="eliminarProducto('${item.nombre}')">X</button>
                </td>
            </tr>
        `;
    });

    totalHTML.textContent = total;
}

function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 🛒");
        return;
    }

    alert("✨ Gracias por tu compra en Luciérnaga Shopp ✨");
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}

// Cargar carrito al abrir la página
mostrarCarrito();


function finalizarCompra() {
    if (carrito.length === 0) {
        alert("Tu carrito está vacío 🛒");
        return;
    }

    let mensaje = "✨ *Pedido Luciérnaga Shopp* ✨\n\n";
    let total = 0;

    carrito.forEach(item => {
        mensaje += `• ${item.nombre} x${item.cantidad} - $${item.precio * item.cantidad}\n`;
        total += item.precio * item.cantidad;
    });

    mensaje += `\n💰 *Total: $${total}*`;

    // 👉 CAMBIA ESTE NÚMERO POR EL TUYO (con código de país)
    const telefono = "595991374144";

    const url = `https://wa.me/${telefono}?text=${encodeURIComponent(mensaje)}`;

    window.open(url, "_blank");

    carrito = [];
    guardarCarrito();
    mostrarCarrito();
}