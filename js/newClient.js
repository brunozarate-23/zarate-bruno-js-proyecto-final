// Javascript para crear un Lead Nuevo

// Busco el evento de carga de datos del formulario del modal
document.getElementById('formCrearLead').addEventListener('submit', function (event) {
    event.preventDefault();

    // Traer los datos
    const formulario = event.target;
    // Dar el formato del JSON/localStorage
    const nuevoLead = {
        nombre: formulario.nombre.value,
        telefono: formulario.telefono.value,
        email: formulario.email.value,
        direccion: formulario.direccion.value,
        producto_interesado: formulario.producto_interesado.value,
        precio_producto: formulario.precio_producto.value,
        estado_lead: 'newClientKanban' // Valor por default
    };

    // Agregamos los datos a la variable global del localStorage
    const local = localStorage.getItem('leads');
    window.data = JSON.parse(local);
    window.data.push(nuevoLead);
    localStorage.setItem('leads', JSON.stringify(data));

    // Se vuelve a renderizar para mostrar la tarjeta
    renderizarKanban();

    // Cerrar modal automaticamente (buscado en reddit para lograrlo)
    const modalElement = document.getElementById('nuevoLead');
    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);
    modal.hide();

    // Limpiar formulario
    formulario.reset();

});
