/* ============================================
   APP.JS - Logica principal parte 1
   Login, datos personales, previsualizacion
   ============================================ */

// Previsualizacion helper
function datoPrev(etiqueta, valor) {
    return '<div class="dato-preview"><span class="etiqueta">' + etiqueta + '</span><span class="valor">' + (valor || "—") + '</span></div>';
}
function cerrarModal() {
    document.getElementById("modalOverlay").classList.remove("activo");
}
function irSiguiente(pagina) { window.location.href = pagina; }
function irAnterior(pagina) { window.location.href = pagina; }

// LOGIN
function iniciarSesion() {
    var usuario = document.getElementById("usuario").value.trim();
    var contrasena = document.getElementById("contrasena").value.trim();
    var rol = obtenerRadioValor("rol");
    limpiarTodosLosErrores();
    var v = true;
    if (!validarTextoRequerido("usuario", "Usuario")) v = false;
    if (!validarTextoRequerido("contrasena", "Contraseña")) v = false;
    if (!rol) {
        var c = document.getElementById("contenedorRol");
        if (c) { c.classList.add("campo-error"); var m = c.querySelector(".mensaje-error"); if (m) { m.textContent = "Debe seleccionar un rol"; m.style.display = "block"; } }
        v = false;
    }
    if (!v) return;
    usuarioActual = usuario; rolActual = rol;
    if (rol === "admin") { window.location.href = "admin.html"; }
    else { window.location.href = "datos-personales.html"; }
}

// GUARDAR DATOS PERSONALES
function guardarDatosPersonales() {
    hojaVidaActual.datosPersonales = {
        primerApellido: document.getElementById("primerApellido").value.trim(),
        segundoApellido: document.getElementById("segundoApellido").value.trim(),
        nombres: document.getElementById("nombres").value.trim(),
        tipoDocumento: obtenerRadioValor("tipoDocumento"),
        numeroDocumento: document.getElementById("numeroDocumento").value.trim(),
        sexo: obtenerRadioValor("sexo"),
        nacionalidad: obtenerRadioValor("nacionalidad"),
        pais: document.getElementById("paisNacionalidad") ? document.getElementById("paisNacionalidad").value : "colombia",
        libretaClase: obtenerRadioValor("libretaClase"),
        libretaNumero: document.getElementById("libretaNumero") ? document.getElementById("libretaNumero").value.trim() : "",
        distritoMilitar: document.getElementById("distritoMilitar") ? document.getElementById("distritoMilitar").value : "",
        fechaNacDia: document.getElementById("nacDia").value,
        fechaNacMes: document.getElementById("nacMes").value,
        fechaNacAnio: document.getElementById("nacAnio").value.trim(),
        paisNac: document.getElementById("paisNac").value,
        deptoNac: document.getElementById("deptoNac").value,
        municipioNac: document.getElementById("municipioNac").value,
        direccionCorrespondencia: document.getElementById("direccionCorr").value.trim(),
        paisCorr: document.getElementById("paisCorr").value,
        deptoCorr: document.getElementById("deptoCorr").value,
        municipioCorr: document.getElementById("municipioCorr").value,
        telefono: document.getElementById("telefono").value.trim(),
        email: document.getElementById("email").value.trim()
    };
}

// VALIDAR DATOS PERSONALES
function validarDatosPersonales() {
    limpiarTodosLosErrores();
    var v = true;
    if (!validarSoloLetras("primerApellido", "Primer apellido")) v = false;
    if (!validarSoloLetras("nombres", "Nombres")) v = false;
    if (!validarRadioRequerido("tipoDocumento", "contenedorTipoDoc", "tipo de documento")) v = false;
    if (!validarSoloNumeros("numeroDocumento", "Número de documento")) v = false;
    if (!validarRadioRequerido("sexo", "contenedorSexo", "el sexo")) v = false;
    if (!validarRadioRequerido("nacionalidad", "contenedorNacionalidad", "la nacionalidad")) v = false;
    if (!validarSelectRequerido("nacDia", "el día")) v = false;
    if (!validarSelectRequerido("nacMes", "el mes")) v = false;
    if (!validarTextoRequerido("nacAnio", "Año de nacimiento")) v = false;
    if (!validarSelectRequerido("deptoNac", "el departamento")) v = false;
    if (!validarSelectRequerido("municipioNac", "el municipio")) v = false;
    if (!validarTextoRequerido("direccionCorr", "Dirección")) v = false;
    if (!validarTelefono("telefono")) v = false;
    if (!validarEmail("email")) v = false;
    return v;
}

function previsualizarDatosPersonales() {
    if (!validarDatosPersonales()) {
        mostrarAlerta("alertaGeneral", "Complete los campos obligatorios.", "error"); return;
    }
    guardarDatosPersonales();
    var d = hojaVidaActual.datosPersonales;
    var h = '<h3>Previsualización - Datos Personales</h3>';
    h += datoPrev("Primer Apellido", d.primerApellido);
    h += datoPrev("Segundo Apellido", d.segundoApellido);
    h += datoPrev("Nombres", d.nombres);
    h += datoPrev("Documento", d.tipoDocumento + " " + d.numeroDocumento);
    h += datoPrev("Sexo", d.sexo === "M" ? "Masculino" : "Femenino");
    h += datoPrev("Nacimiento", d.fechaNacDia + "/" + d.fechaNacMes + "/" + d.fechaNacAnio);
    h += datoPrev("Dirección", d.direccionCorrespondencia);
    h += datoPrev("Teléfono", d.telefono);
    h += datoPrev("Email", d.email);
    h += '<div class="modal-botones"><button class="btn btn-secundario" onclick="cerrarModal()">Cerrar</button>';
    h += '<button class="btn btn-primario" onclick="cerrarModal();irSiguiente(\'formacion-academica.html\')">Continuar ➜</button></div>';
    document.getElementById("modalContenido").innerHTML = h;
    document.getElementById("modalOverlay").classList.add("activo");
}

// Eliminar registro dinamico
function eliminarRegistro(id) { var e = document.getElementById(id); if (e) e.remove(); }

// Opciones dias/meses para dinámicos
function opcionesDias() {
    var h = '<option value="">-- Día --</option>';
    for (var d = 1; d <= 31; d++) { var v = d < 10 ? "0"+d : ""+d; h += '<option value="'+v+'">'+v+'</option>'; }
    return h;
}
function opcionesMeses() {
    var h = '';
    for (var i = 0; i < meses.length; i++) { h += '<option value="'+meses[i].valor+'">'+meses[i].texto+'</option>'; }
    return h;
}
