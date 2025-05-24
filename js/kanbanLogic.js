let data;
// Cargamos los datos desde 'Contacts.json', salvo que ya se hayan cargado previamente en localStorage y renderizamos las tarjetas
async function cargarDatos() {
    // Try & Catch para detectar errores en la carga de datos
    try {
        const local = localStorage.getItem('leads');

        if (local) {
            data = JSON.parse(local);
        } else {
            const response = await fetch('./database/contacts.json')
            if (!response.ok) {
                throw new Error('Error al cargar el archivo "contacts.json');
            }

            data = await response.json();
            localStorage.setItem('leads', JSON.stringify(data));
        }

        renderizarKanban();
    } catch (error) {
        console.error('Error al cargar los datos', error);
        alert('Erro al cargar los leads');
    }
}

// Funcion que solo se dedica a guardar los datos en localStorage
function guardarDatos() {
    localStorage.setItem('leads', JSON.stringify(data));
}

// Es la lógica principal del Kanban
window.renderizarKanban = function () {
    // Primero hay que limpiar las columnas, sino a veces se duplicaban
    const columnas = ['newClientKanban','interesadoKanban','concretadoKanban','perdidoKanban'];
    columnas.forEach(id => document.getElementById(id).innerHTML = '');
    
    data.forEach(lead => {

        // Creamos las tarjetas
        const card = document.createElement('div');
        card.className = 'card mb-2 border-dark';

        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        // Se crea cada elemento de la tarjeta según el Lead
        const nombre = document.createElement('h5');
        nombre.className = 'card-title text-center';
        nombre.textContent = lead.nombre;

        const listGroup = document.createElement('ul');
        listGroup.className = 'list-group list-group-flush';

        const telefono = document.createElement('li');
        telefono.className = 'list-group-item';
        telefono.textContent = 'Télefono: ' + lead.telefono;

        const email = document.createElement('li');
        email.className = 'list-group-item';
        email.textContent = 'Email: ' + lead.email;

        const direccion = document.createElement('li');
        direccion.className = 'list-group-item';
        direccion.textContent = 'Dirección: ' + lead.direccion;

        const productoInteresado = document.createElement('li');
        productoInteresado.className = 'list-group-item';
        productoInteresado.textContent = 'Interés: ' + lead.producto_interesado;

        const precioProducto = document.createElement('li');
        precioProducto.className = 'list-group-item';
        precioProducto.textContent = 'Valor: $' + lead.precio_producto;

        // Se agregan a una lista previamente creada
        listGroup.appendChild(telefono);
        listGroup.appendChild(email);
        listGroup.appendChild(direccion);
        listGroup.appendChild(productoInteresado);
        listGroup.appendChild(precioProducto);

        // Se crean los botones y se suma la función de moverlos.
        // Copilot dió la idea de los 3 parametros para que sean menos lineas,
        // Ya que previamente era una función por cada botón.
        const btnNuevoCliente = crearBoton('/img/nuevocliente.svg', 'btn btn-primary', () => moverTarjeta('newClientKanban'));
        const btnInteresado = crearBoton('/img/interesado.svg', 'btn btn-info', () => moverTarjeta('interesadoKanban'));
        const btnConcretado = crearBoton('/img/concretado.svg', 'btn btn-success', () => moverTarjeta('concretadoKanban'));
        const btnPerdido = crearBoton('/img/perdido.svg', 'btn btn-danger', () => moverTarjeta('perdidoKanban'));

        // Función que permite mover las tarjetas entre columnas del Kanban
        function moverTarjeta(nuevoEstado) {
            lead.estado_lead = nuevoEstado;
            guardarDatos();
            const columna = document.getElementById(nuevoEstado);
            if (columna) columna.appendChild(card);
        }

        // Se agregan los items, lista y botones a la tarjeta
        cardBody.appendChild(nombre);
        cardBody.appendChild(listGroup);
        cardBody.appendChild(btnNuevoCliente);
        cardBody.appendChild(btnInteresado);
        cardBody.appendChild(btnConcretado);
        cardBody.appendChild(btnPerdido);
        card.appendChild(cardBody);

        // Finalmente se agrega la tarjeta a su correspondiente columna
        const columna = document.getElementById(lead.estado_lead);
        if (columna) columna.appendChild(card);
    });
}

// Función que simplifica crear los botones.
// Copilot recomendó hacerlo de esta manera ya que eran muchas lineas de código.
function crearBoton(iconSrc, btnClass, callback) {
    const btn = document.createElement('button');
    const icon = document.createElement('img');
    icon.src = iconSrc;
    btn.className = btnClass + ' mx-1 px-3';
    btn.appendChild(icon);
    btn.addEventListener('click', callback);
    return btn;
}

await cargarDatos();