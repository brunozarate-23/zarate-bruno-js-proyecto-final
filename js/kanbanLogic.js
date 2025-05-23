// Cargar contenido del DOM primero
document.addEventListener('DOMContentLoaded', function () {
    const nuevoClienteColumna = document.getElementById('newClientKanban');
    const interesadoColumna = document.getElementById('interesadoKanban');
    const concretadoColumna = document.getElementById('concretadoKanban');
    const perdidoColumna = document.getElementById('perdidoKanban');
});

// Traemos la data de Contacts.json con un fetch
fetch('../database/contacts.json')
    .then(response => response.json())
    .then(data => {
        // Busco recorrer toda la data para crear una tarjeta en su columna
        data.forEach(lead => {

            // Creo un div con clase de Bootstrap
            const card = document.createElement('div');
            card.className = 'card mb-2 border-dark';

            // Creo el body de la card
            const cardBody = document.createElement('div');
            cardBody.className = 'card-body';

            // Creo el titulo de la card
            const nombre = document.createElement('h5');
            nombre.className = 'card-title text-center';
            nombre.textContent = lead.nombre;

            // Creo una lista con cada uno de los componentes del lead
            const listGroup = document.createElement('ul');
            const telefono = document.createElement('li');
            const email = document.createElement('li');
            const direccion = document.createElement('li');
            const productoInteresado = document.createElement('li');
            const precioProducto = document.createElement('li');

            // Le agrego las clases de Bootstrap
            listGroup.className = 'list-group list-group-flush';
            telefono.className = 'list-group-item';
            email.className = 'list-group-item';
            direccion.className = 'list-group-item';
            productoInteresado.className = 'list-group-item';
            precioProducto.className = 'list-group-item';

            // Agrego el texto de cada lead
            telefono.textContent = 'Télefono: ' + lead.telefono;
            email.textContent = 'Email: ' + lead.email;
            direccion.textContent = 'Dirección: ' + lead.direccion;
            productoInteresado.textContent = 'Interés: ' + lead.producto_interesado;
            precioProducto.textContent = 'Valor: ' + '$' + lead.precio_producto;

            // Botones para cambiar el estado del Lead
            const btnNuevoCliente = document.createElement('button');
            const iconNuevoCliente = document.createElement('img');

            const btnInteresado = document.createElement('button');
            const iconInteresado = document.createElement('img');

            const btnConcretado = document.createElement('button');
            const iconConcretado = document.createElement('img');

            const btnPerdido = document.createElement('button');
            const iconPerdido = document.createElement('img');

            // Clases de Bootstrap para cada botón y se agrega su icono
            btnNuevoCliente.className = 'btn btn-primary mx-1 px-3';
            iconNuevoCliente.src = '../img/nuevocliente.svg';
            btnNuevoCliente.appendChild(iconNuevoCliente);

            btnInteresado.className = 'btn btn-info mx-1 px-3';
            iconInteresado.src = '../img/interesado.svg';
            btnInteresado.appendChild(iconInteresado);

            btnConcretado.className = 'btn btn-success mx-1 px-3';
            iconConcretado.src = '../img/concretado.svg';
            btnConcretado.appendChild(iconConcretado);

            btnPerdido.className = 'btn btn-danger mx-1 px-3';
            iconPerdido.src = '../img/perdido.svg';
            btnPerdido.appendChild(iconPerdido);

            // Se arma la estructura de la carta
            card.appendChild(cardBody);
            cardBody.appendChild(nombre);
            cardBody.appendChild(listGroup);
            listGroup.appendChild(telefono);
            listGroup.appendChild(email);
            listGroup.appendChild(direccion);
            listGroup.appendChild(productoInteresado);
            listGroup.appendChild(precioProducto);
            cardBody.appendChild(btnNuevoCliente);
            cardBody.appendChild(btnInteresado);
            cardBody.appendChild(btnConcretado);
            cardBody.appendChild(btnPerdido);

            // Agregar a la columna correcta segun su estado en el Pipeline de Ventas
            const columna = document.getElementById(lead.estado_lead);
            if (columna) {
                columna.appendChild(card);
            }
        });
    })