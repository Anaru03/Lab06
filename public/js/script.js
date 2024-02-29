document.addEventListener('DOMContentLoaded', function() {
    const botonFechaHora = document.getElementById('boton-fecha-hora');
    botonFechaHora.addEventListener('click', function() {
        fecha_hora();
    });
});

function fecha_hora() {
    const fechaHoraActual = new Date();
    const dia = fechaHoraActual.getDate();
    const mes = fechaHoraActual.getMonth() + 1; 
    const anio = fechaHoraActual.getFullYear();
    const hora = fechaHoraActual.getHours();
    const minutos = fechaHoraActual.getMinutes();
    const segundos = fechaHoraActual.getSeconds();

    const mensaje = `Hoy es ${dia}/${mes}/${anio} y son las ${hora}:${minutos}:${segundos}`;

    alert(mensaje);
}
