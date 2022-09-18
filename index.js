let productos = [];

let formularioCotizador;
let inputClienteProducto;
let inputTelefonoProducto;
let inputIdClienteProducto;
let inputNombreProducto;
let inputCantidadProducto;
let inputPrecioProducto;
let contenedorProductos;

class Producto {
    constructor(cliente, telefono, id, nombre, cantidad, precio) {
        this.cliente = cliente;
        this.telefono = telefono;
        this.id = id;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }
    //Función para calcular el impuesto por producto
    calcularProducto = (cantidad,precio) => {
        return (cantidad*precio)*1.18

        }
}

function inicializarElementos() {
    formularioCotizador = document.getElementById("formularioCotizador");
    inputClienteProducto = document.getElementById("inputClienteProducto");
    inputTelefonoProducto = document.getElementById("inputTelefonoProducto");
    inputIdClienteProducto = document.getElementById("inputIdClienteProducto");
    inputNombreProducto = document.getElementById("inputNombreProducto");
    inputCantidadProducto = document.getElementById("inputCantidadProducto");
    inputPrecioProducto = document.getElementById("inputPrecioProducto");
    contenedorProductos = document.getElementById("contenedorProductos");
}

function inicializarEventos() {
    formularioCotizador.onsubmit = (event) => validarFormulario(event);
}

function validarFormulario(event) {
    event.preventDefault();
    let cliente = inputClienteProducto.value;
    let telefono = inputTelefonoProducto.value;
    let id = inputIdClienteProducto.value;
    let nombre = inputNombreProducto.value;
    let cantidad = parseInt(inputCantidadProducto.value);
    let precio = parseFloat(inputPrecioProducto.value);

    const idExiste = productos.some((producto) => producto.id === id);
    if (!idExiste) {
        let producto = new Producto(
            cliente,
            telefono,
            id,
            nombre,
            cantidad,
            precio
        );

        productos.push(producto);
        formularioCotizador.reset();

        pintarProductos();
    } else {
        alert("El ID ya existe, por favor ingresa otro ID");
    }
}

function eliminarProducto(id) {
    let columnaBorrar = document.getElementById(`columna-${id}`);
    let indiceBorrar = productos.findIndex(
        (producto) => Number(producto.id) === Number(id)
    );

    productos.splice(indiceBorrar, 1);
    columnaBorrar.remove();
}

function pintarProductos() {
    contenedorProductos.innerHTML = "";
    productos.forEach((producto) => {
        let column = document.createElement("div");
        column.className = "col-md-4 mt-3";
        column.id = `columna-${producto.id}`;
        column.innerHTML = `
            <div class="card">
                <div class="card-body">
                <p class="card-text">ID:
                    <b>${producto.id}</b>
                </p>
                <p class="card-text">Nombre del Cliente:
                    <b>${producto.cliente}</b>
                </p>
                <p class="card-text">Telefono:
                <b>${producto.telefono}</b>
            </p>
                <p class="card-text">Producto:
                    <b>${producto.nombre}</b>
                </p>
                <p class="card-text">Cantidad:
                    <b>${producto.cantidad}</b>
                </p>
                <p class="card-text">Precio:
                    <b>${producto.precio}</b>
                </p>
                <p class="card-text">Total:
                <b>${producto.cantidad*producto.precio*1.18}</b>
            </p>
                </div>
                <div class="card-footer">
                    <button class="btn btn-danger" id="botonEliminar-${producto.id}" >Eliminar</button>
                </div>
            </div>`;

        contenedorProductos.append(column);

        let botonEliminar = document.getElementById(`botonEliminar-${producto.id}`);
        botonEliminar.onclick = () => eliminarProducto(producto.id);
    });
}

function main() {
    inicializarElementos();
    inicializarEventos();
}

main();