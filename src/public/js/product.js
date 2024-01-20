// products.js

const socket = io();
const limit = '';
const dataTable = $('#productTable').DataTable();

console.log("Título de la página:", programa);

// Obtener productos desde la API REST
const obtenerProductosDesdeAPI = async () => {
  const response = await fetch('http://localhost:8080/api/products/');
  const data = await response.json();
  console.log(data.payload);
  return data.payload;
};

// Función para obtener productos usando WebSockets
const obtenerProductos = async () => {
  const productosDesdeAPI = await obtenerProductosDesdeAPI();

  // Enviar productos obtenidos a través de WebSockets
  socket.emit('getproducts', productosDesdeAPI);
};

// Resto del código...

// llamamos la función de datos la primera vez
obtenerProductos();

$(document).ready(function () {
  var dataTable = $('#productTable').DataTable();

  // reaccionamos al click de eliminar por fila
  $('#productTable').on('click', '.eliminar-btn', function () {    
    let data = dataTable.row($(this).parents('tr')).data();
    // quitamos del JSON por WebSockets
    remove(data[0]);
    // quitamos la fila para no renderizar
    dataTable.row($(this).parents('tr')).remove().draw();
  });
});

function remove(productData) {
  const handleResult = function (status) {
    const messageText = status.message;
    $('#result').text(messageText);
  };
  socket.emit('eliminaProducto', productData, handleResult);
}

