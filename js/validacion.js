/* ============================================
   VALIDACION DE FORMULARIOS
   Sin usar required de HTML
   ============================================ */

// Mostrar error en un campo
function mostrarError(idCampo, mensaje) {
    var campo = document.getElementById(idCampo);
    if (!campo) return;
    var contenedor = campo.closest(".campo");
    if (!contenedor) return;
    contenedor.classList.add("campo-error");
    var msgError = contenedor.querySelector(".mensaje-error");
    if (msgError) {
        msgError.textContent = mensaje;
        msgError.style.display = "block";
    }
}

// Limpiar error de un campo
function limpiarError(idCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return;
    var contenedor = campo.closest(".campo");
    if (!contenedor) return;
    contenedor.classList.remove("campo-error");
    var msgError = contenedor.querySelector(".mensaje-error");
    if (msgError) {
        msgError.textContent = "";
        msgError.style.display = "none";
    }
}

// Limpiar todos los errores del formulario
function limpiarTodosLosErrores() {
    var camposError = document.querySelectorAll(".campo-error");
    for (var i = 0; i < camposError.length; i++) {
        camposError[i].classList.remove("campo-error");
        var msg = camposError[i].querySelector(".mensaje-error");
        if (msg) {
            msg.textContent = "";
            msg.style.display = "none";
        }
    }
}

// Validar que un campo de texto no este vacio
function validarTextoRequerido(idCampo, nombreCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    var valor = campo.value.trim();
    if (valor === "") {
        mostrarError(idCampo, nombreCampo + " es obligatorio");
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Validar que un select tenga algo seleccionado
function validarSelectRequerido(idCampo, nombreCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    if (campo.value === "" || campo.value === null) {
        mostrarError(idCampo, "Debe seleccionar " + nombreCampo);
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Validar grupo de radio buttons
function validarRadioRequerido(nombre, idContenedor, nombreCampo) {
    var radios = document.getElementsByName(nombre);
    var seleccionado = false;
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) {
            seleccionado = true;
            break;
        }
    }
    if (!seleccionado) {
        var contenedor = document.getElementById(idContenedor);
        if (contenedor) {
            contenedor.classList.add("campo-error");
            var msg = contenedor.querySelector(".mensaje-error");
            if (msg) {
                msg.textContent = "Debe seleccionar " + nombreCampo;
                msg.style.display = "block";
            }
        }
        return false;
    } else {
        var contenedor = document.getElementById(idContenedor);
        if (contenedor) {
            contenedor.classList.remove("campo-error");
            var msg = contenedor.querySelector(".mensaje-error");
            if (msg) {
                msg.textContent = "";
                msg.style.display = "none";
            }
        }
    }
    return true;
}

// Validar formato de email
function validarEmail(idCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    var valor = campo.value.trim();
    if (valor === "") {
        mostrarError(idCampo, "El correo electrónico es obligatorio");
        return false;
    }
    // Formato basico de email
    var patron = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!patron.test(valor)) {
        mostrarError(idCampo, "El formato del correo no es válido");
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Validar que sea solo numeros
function validarSoloNumeros(idCampo, nombreCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    var valor = campo.value.trim();
    if (valor === "") {
        mostrarError(idCampo, nombreCampo + " es obligatorio");
        return false;
    }
    if (!/^\d+$/.test(valor)) {
        mostrarError(idCampo, nombreCampo + " debe contener solo números");
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Validar telefono (solo numeros, minimo 7 digitos)
function validarTelefono(idCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    var valor = campo.value.trim();
    if (valor === "") {
        mostrarError(idCampo, "El teléfono es obligatorio");
        return false;
    }
    if (!/^\d{7,15}$/.test(valor)) {
        mostrarError(idCampo, "El teléfono debe tener entre 7 y 15 dígitos");
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Validar solo letras y espacios
function validarSoloLetras(idCampo, nombreCampo) {
    var campo = document.getElementById(idCampo);
    if (!campo) return false;
    var valor = campo.value.trim();
    if (valor === "") {
        mostrarError(idCampo, nombreCampo + " es obligatorio");
        return false;
    }
    if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/.test(valor)) {
        mostrarError(idCampo, nombreCampo + " solo debe contener letras");
        return false;
    }
    limpiarError(idCampo);
    return true;
}

// Mostrar alerta general
function mostrarAlerta(idAlerta, mensaje, tipo) {
    var alerta = document.getElementById(idAlerta);
    if (!alerta) return;
    alerta.textContent = mensaje;
    alerta.className = "alerta visible " + (tipo === "error" ? "alerta-error" : "alerta-exito");
    // scroll arriba para ver el mensaje
    window.scrollTo({ top: 0, behavior: "smooth" });
    // Quitar despues de 5 segundos
    setTimeout(function() {
        alerta.classList.remove("visible");
    }, 5000);
}

// Obtener valor de radio seleccionado
function obtenerRadioValor(nombre) {
    var radios = document.getElementsByName(nombre);
    for (var i = 0; i < radios.length; i++) {
        if (radios[i].checked) return radios[i].value;
    }
    return "";
}
