$(document).ready(function() {
    var cursosSeleccionados = [];
    var medioPagoSeleccionado = '';

    $('#siguientePaso1').click(function(e) {
        e.preventDefault();
        var curso = $('#curso').val();
        cursosSeleccionados.push(curso);
        $('#paso1').hide();
        $('#paso2').show();
    });

    $('#siguientePaso2').click(function(e) {
        e.preventDefault();
        $('#paso2').hide();
        $('#paso3').show();
    });

    $('#confirmar').click(function(e) {
        e.preventDefault();
        medioPagoSeleccionado = $('input[name="medioPago"]:checked').val();
        mostrarDetalleMatricula();
    });

    function mostrarDetalleMatricula() {
        var total = calcularTotal();
        $('#detalleCurso').text('Curso(s): ' + cursosSeleccionados.join(', '));
        $('#detalleModulos').text('Módulos: ' + obtenerModulosSeleccionados().join(', '));
        $('#detallePago').text('Medio de Pago: ' + medioPagoSeleccionado);
        $('#totalPagar').text('Total a Pagar: S/ ' + total.toFixed(2));
        $('#paso3').hide();
        $('#detalles').show();
    }

    function obtenerModulosSeleccionados() {
        var modulos = [];
        $('input[name="modulos"]:checked').each(function() {
            modulos.push($(this).val());
        });
        return modulos;
    }

    function calcularTotal() {
        var total = 0;
        cursosSeleccionados.forEach(function(curso) {
            var precioCurso = obtenerPrecioCurso(curso);
            var modulosSeleccionados = obtenerModulosSeleccionados().length;
            var totalCurso = precioCurso * modulosSeleccionados;
            if (medioPagoSeleccionado === 'Pago en efectivo') {
                totalCurso *= 0.9; // Aplicar descuento del 10% si el pago es en efectivo
            }
            total += totalCurso;
        });
        return total;
    }

    // Función para obtener el precio del curso seleccionado
    function obtenerPrecioCurso(curso) {
        switch (curso) {
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
});
