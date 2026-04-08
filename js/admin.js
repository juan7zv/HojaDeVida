/* ============================================
   ADMIN.JS - Panel de administración
   Visualizar, filtrar y cambiar estado de HV
   ============================================ */

function cargarTablaAdmin() {
    var filtro = document.getElementById("filtroEstado").value;
    var tbody = document.getElementById("tablaHVBody");
    tbody.innerHTML = "";

    for (var i = 0; i < hojasDeVida.length; i++) {
        var hv = hojasDeVida[i];
        if (filtro !== "todas" && hv.estado !== filtro) continue;

        var dp = hv.datosPersonales;
        var nombre = dp.nombres + " " + dp.primerApellido + " " + dp.segundoApellido;
        var badgeClass = "badge-" + hv.estado;
        var estadoTexto = hv.estado.charAt(0).toUpperCase() + hv.estado.slice(1);

        var fila = "<tr>";
        fila += "<td>" + hv.id + "</td>";
        fila += "<td>" + nombre + "</td>";
        fila += "<td>" + dp.numeroDocumento + "</td>";
        fila += "<td>" + hv.fechaCreacion + "</td>";
        fila += '<td><span class="badge ' + badgeClass + '">' + estadoTexto + '</span></td>';
        fila += '<td><button class="btn btn-acento" onclick="verDetalleHV(' + i + ')">Ver Detalle</button></td>';
        fila += "</tr>";
        tbody.innerHTML += fila;
    }

    if (tbody.innerHTML === "") {
        tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;color:#6C757D;padding:20px;">No se encontraron hojas de vida</td></tr>';
    }
}

function verDetalleHV(indice) {
    var hv = hojasDeVida[indice];
    var detalle = document.getElementById("detalleHV");
    var dp = hv.datosPersonales;

    var h = '<h3>Detalle de Hoja de Vida #' + hv.id + '</h3>';

    // Datos personales
    h += '<div class="info-grupo"><h4>📋 Datos Personales</h4>';
    h += datoPrevAdmin("Nombre", dp.nombres + " " + dp.primerApellido + " " + dp.segundoApellido);
    h += datoPrevAdmin("Documento", dp.tipoDocumento + " " + dp.numeroDocumento);
    h += datoPrevAdmin("Sexo", dp.sexo === "M" ? "Masculino" : "Femenino");
    h += datoPrevAdmin("Email", dp.email);
    h += datoPrevAdmin("Teléfono", dp.telefono);
    h += datoPrevAdmin("Dirección", dp.direccionCorrespondencia);
    h += '</div>';

    // Formacion
    if (hv.formacionAcademica) {
        h += '<div class="info-grupo"><h4>🎓 Formación Académica</h4>';
        h += datoPrevAdmin("Último Grado", hv.formacionAcademica.gradoAprobado);
        h += datoPrevAdmin("Título Básica", hv.formacionAcademica.tituloBasica);
        if (hv.formacionAcademica.estudiosSuperiores) {
            for (var j = 0; j < hv.formacionAcademica.estudiosSuperiores.length; j++) {
                var es = hv.formacionAcademica.estudiosSuperiores[j];
                h += datoPrevAdmin("Estudio " + (j+1), es.modalidad + " - " + es.nombreEstudio);
            }
        }
        if (hv.formacionAcademica.idiomas) {
            for (var j = 0; j < hv.formacionAcademica.idiomas.length; j++) {
                var id = hv.formacionAcademica.idiomas[j];
                h += datoPrevAdmin("Idioma", id.idioma + " (H:" + id.habla + " L:" + id.lee + " E:" + id.escribe + ")");
            }
        }
        h += '</div>';
    }

    // Experiencia
    if (hv.experienciaLaboral) {
        h += '<div class="info-grupo"><h4>💼 Experiencia Laboral</h4>';
        for (var j = 0; j < hv.experienciaLaboral.length; j++) {
            var ex = hv.experienciaLaboral[j];
            h += datoPrevAdmin("Empresa " + (j+1), ex.empresa + " (" + (ex.tipoEmpresa==="publica"?"Pública":"Privada") + ")");
            h += datoPrevAdmin("Cargo", ex.cargo);
        }
        h += '</div>';
    }

    // Tiempo
    if (hv.totalAnios || hv.totalMeses) {
        h += '<div class="info-grupo"><h4>⏱️ Tiempo Total</h4>';
        h += datoPrevAdmin("Total", (hv.totalAnios||"0") + " años, " + (hv.totalMeses||"0") + " meses");
        h += '</div>';
    }

    // Cambiar estado
    var estadoActual = hv.estado;
    h += '<div class="cambiar-estado">';
    h += '<label><strong>Cambiar Estado:</strong></label>';
    h += '<select id="nuevoEstado_' + indice + '">';
    h += '<option value="diligenciada"' + (estadoActual==="diligenciada"?" selected":"") + '>Diligenciada</option>';
    h += '<option value="aceptada"' + (estadoActual==="aceptada"?" selected":"") + '>Aceptada</option>';
    h += '<option value="rechazada"' + (estadoActual==="rechazada"?" selected":"") + '>Rechazada</option>';
    h += '</select>';
    h += '<button class="btn btn-primario" onclick="cambiarEstadoHV(' + indice + ')">Actualizar</button>';
    h += '<button class="btn btn-secundario" onclick="cerrarDetalleHV()">Cerrar</button>';
    h += '</div>';

    detalle.innerHTML = h;
    detalle.classList.add("activo");
    detalle.scrollIntoView({ behavior: "smooth" });
}

function datoPrevAdmin(etiqueta, valor) {
    return '<div class="dato-preview"><span class="etiqueta">' + etiqueta + '</span><span class="valor">' + (valor || "—") + '</span></div>';
}

function cambiarEstadoHV(indice) {
    var nuevoEstado = document.getElementById("nuevoEstado_" + indice).value;
    hojasDeVida[indice].estado = nuevoEstado;
    cargarTablaAdmin();
    cerrarDetalleHV();
    mostrarAlerta("alertaGeneral", "Estado actualizado correctamente a: " + nuevoEstado.toUpperCase(), "exito");
}

function cerrarDetalleHV() {
    var detalle = document.getElementById("detalleHV");
    detalle.classList.remove("activo");
    detalle.innerHTML = "";
}
