$(document).ready(function() {
    // Variables para almacenar la selección del usuario
    var cursoSeleccionado = '';
    var modulosSeleccionados = [];
    var medioPagoSeleccionado = '';

    // Evento para el botón "Siguiente" del Paso 1
    $('#siguientePaso1').click(function(e) {
        e.preventDefault();
        cursoSeleccionado = $('#curso').val();
        $('#paso1').hide();
        $('#paso2').show();
    });

    // Evento para el botón "Siguiente" del Paso 2
    $('#siguientePaso2').click(function(e) {
        e.preventDefault();
        $('input[name="modulos"]:checked').each(function() {
            modulosSeleccionados.push($(this).val());
        });
        $('#paso2').hide();
        $('#paso3').show();
    });

    // Evento para el botón "Confirmar Matrícula" del Paso 3
    $('#confirmar').click(function(e) {
        e.preventDefault();
        medioPagoSeleccionado = $('input[name="medioPago"]:checked').val();
        mostrarDetalleMatricula();
    });

    // Función para mostrar el detalle de la matrícula
    function mostrarDetalleMatricula() {
        var precioCurso = obtenerPrecioCurso();
        var total = calcularTotal(precioCurso);
        $('#detalleCurso').text('Curso: ' + cursoSeleccionado);
        $('#detalleModulos').text('Módulos: ' + modulosSeleccionados.join(', '));
        $('#detallePago').text('Medio de Pago: ' + medioPagoSeleccionado);
        $('#totalPagar').text('Total a Pagar: S/ ' + total.toFixed(2));
        $('#paso3').hide();
        $('#detalles').show();
    }

    // Función para obtener el precio del curso seleccionado
    function obtenerPrecioCurso() {
        switch (cursoSeleccionado) {
            case 'Java':
                return 1200;
            case 'PHP':
                return 800;
            case '.NET':
                return 1500;
            default:
                return 0;
        }
    }

    // Función para calcular el total a pagar
    function calcularTotal(precioCurso) {
        var total = precioCurso;
        if (medioPagoSeleccionado === 'Pago en efectivo') {
            total *= 0.9; // Aplicar descuento del 10% si el pago es en efectivo
        }
        return total;
    }
});
