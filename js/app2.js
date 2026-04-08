/* ============================================
   APP2.JS - Formacion academica, experiencia,
   tiempo experiencia, certificacion
   ============================================ */

// FORMACION ACADEMICA - Registros dinamicos
var contadorEstudios = 0;
var contadorIdiomas = 0;

function agregarEstudioSuperior() {
    contadorEstudios++;
    var c = document.getElementById("listaEstudios");
    var div = document.createElement("div");
    div.className = "registro-dinamico"; div.id = "estudio_" + contadorEstudios;
    var n = contadorEstudios;
    var h = '<div class="registro-header"><h4>Estudio Superior #'+n+'</h4>';
    h += '<button type="button" class="btn btn-eliminar" onclick="eliminarRegistro(\'estudio_'+n+'\')">✕ Eliminar</button></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Modalidad Académica</label><select id="modalidad_'+n+'"><option value="">-- Seleccionar --</option>';
    for (var i = 0; i < modalidadesAcademicas.length; i++) h += '<option value="'+modalidadesAcademicas[i].valor+'">'+modalidadesAcademicas[i].texto+'</option>';
    h += '</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>No. Semestres</label><input type="number" id="semestres_'+n+'" min="1" max="20"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo" id="contGraduado_'+n+'"><label>Graduado</label><div class="grupo-radio">';
    h += '<label><input type="radio" name="graduado_'+n+'" value="si"> Sí</label><label><input type="radio" name="graduado_'+n+'" value="no"> No</label>';
    h += '</div><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Nombre de Estudios / Título</label><input type="text" id="nombreEstudio_'+n+'"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Mes Terminación</label><select id="mesTerminacion_'+n+'">' + opcionesMeses() + '</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Año Terminación</label><input type="number" id="anioTerminacion_'+n+'" min="1970" max="2030"><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>No. Tarjeta Profesional</label><input type="text" id="tarjeta_'+n+'"><span class="mensaje-error"></span></div></div>';
    div.innerHTML = h; c.appendChild(div);
}

function agregarIdioma() {
    contadorIdiomas++;
    var c = document.getElementById("listaIdiomas");
    var div = document.createElement("div");
    div.className = "registro-dinamico"; div.id = "idioma_" + contadorIdiomas;
    var n = contadorIdiomas;
    var h = '<div class="registro-header"><h4>Idioma #'+n+'</h4>';
    h += '<button type="button" class="btn btn-eliminar" onclick="eliminarRegistro(\'idioma_'+n+'\')">✕ Eliminar</button></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Idioma</label><input type="text" id="nombreIdioma_'+n+'" placeholder="Ej: Inglés"><span class="mensaje-error"></span></div>';
    h += '<div class="campo" id="contHabla_'+n+'"><label>Lo Habla</label><div class="grupo-radio"><label><input type="radio" name="habla_'+n+'" value="R"> R</label><label><input type="radio" name="habla_'+n+'" value="B"> B</label><label><input type="radio" name="habla_'+n+'" value="MB"> MB</label></div><span class="mensaje-error"></span></div>';
    h += '</div><div class="fila-campos"><div class="campo" id="contLee_'+n+'"><label>Lo Lee</label><div class="grupo-radio"><label><input type="radio" name="lee_'+n+'" value="R"> R</label><label><input type="radio" name="lee_'+n+'" value="B"> B</label><label><input type="radio" name="lee_'+n+'" value="MB"> MB</label></div><span class="mensaje-error"></span></div>';
    h += '<div class="campo" id="contEscribe_'+n+'"><label>Lo Escribe</label><div class="grupo-radio"><label><input type="radio" name="escribe_'+n+'" value="R"> R</label><label><input type="radio" name="escribe_'+n+'" value="B"> B</label><label><input type="radio" name="escribe_'+n+'" value="MB"> MB</label></div><span class="mensaje-error"></span></div></div>';
    div.innerHTML = h; c.appendChild(div);
}

function guardarFormacionAcademica() {
    var gradoAprobado = "";
    var grados = document.getElementsByName("gradoAprobado");
    for (var i = 0; i < grados.length; i++) { if (grados[i].checked) gradoAprobado = grados[i].value; }
    var estudios = [];
    var regs = document.querySelectorAll("#listaEstudios .registro-dinamico");
    for (var i = 0; i < regs.length; i++) {
        var id = regs[i].id.replace("estudio_","");
        estudios.push({ modalidad: val("modalidad_"+id), semestres: val("semestres_"+id), graduado: obtenerRadioValor("graduado_"+id), nombreEstudio: val("nombreEstudio_"+id), mesTerminacion: val("mesTerminacion_"+id), anioTerminacion: val("anioTerminacion_"+id), tarjetaProfesional: val("tarjeta_"+id) });
    }
    var idiomas = [];
    var regI = document.querySelectorAll("#listaIdiomas .registro-dinamico");
    for (var i = 0; i < regI.length; i++) {
        var id = regI[i].id.replace("idioma_","");
        idiomas.push({ idioma: val("nombreIdioma_"+id), habla: obtenerRadioValor("habla_"+id), lee: obtenerRadioValor("lee_"+id), escribe: obtenerRadioValor("escribe_"+id) });
    }
    hojaVidaActual.formacionAcademica = { gradoAprobado: gradoAprobado, tituloBasica: val("tituloBasica"), fechaGradoMes: val("fechaGradoMes"), fechaGradoAnio: val("fechaGradoAnio"), estudiosSuperiores: estudios, idiomas: idiomas };
}
function val(id) { var e = document.getElementById(id); return e ? e.value.trim() : ""; }

function validarFormacionAcademica() {
    limpiarTodosLosErrores(); var v = true;
    var grados = document.getElementsByName("gradoAprobado"); var sel = false;
    for (var i = 0; i < grados.length; i++) { if (grados[i].checked) sel = true; }
    if (!sel) { var c = document.getElementById("contenedorGrados"); if(c){c.classList.add("campo-error");var m=c.querySelector(".mensaje-error");if(m){m.textContent="Seleccione un grado";m.style.display="block";}} v=false; }
    var regs = document.querySelectorAll("#listaEstudios .registro-dinamico");
    for (var i = 0; i < regs.length; i++) { var id = regs[i].id.replace("estudio_",""); if (!validarSelectRequerido("modalidad_"+id,"modalidad")) v=false; if (!validarTextoRequerido("nombreEstudio_"+id,"Nombre")) v=false; }
    var regI = document.querySelectorAll("#listaIdiomas .registro-dinamico");
    for (var i = 0; i < regI.length; i++) { var id = regI[i].id.replace("idioma_",""); if (!validarTextoRequerido("nombreIdioma_"+id,"Idioma")) v=false; }
    return v;
}

function previsualizarFormacion() {
    if (!validarFormacionAcademica()) { mostrarAlerta("alertaGeneral","Complete los campos obligatorios.","error"); return; }
    guardarFormacionAcademica(); var d = hojaVidaActual.formacionAcademica;
    var h = '<h3>Previsualización - Formación Académica</h3>';
    h += datoPrev("Último Grado",d.gradoAprobado); h += datoPrev("Título",d.tituloBasica); h += datoPrev("Fecha Grado",d.fechaGradoMes+"/"+d.fechaGradoAnio);
    if (d.estudiosSuperiores.length > 0) { h += '<h4 style="margin-top:12px;color:#2D6A4F">Estudios Superiores</h4>';
        for (var i=0;i<d.estudiosSuperiores.length;i++) { var e=d.estudiosSuperiores[i]; h += datoPrev(e.modalidad,e.nombreEstudio+" ("+e.semestres+" sem.)"); } }
    if (d.idiomas.length > 0) { h += '<h4 style="margin-top:12px;color:#2D6A4F">Idiomas</h4>';
        for (var i=0;i<d.idiomas.length;i++) { var id=d.idiomas[i]; h += datoPrev(id.idioma,"H:"+id.habla+" L:"+id.lee+" E:"+id.escribe); } }
    h += '<div class="modal-botones"><button class="btn btn-secundario" onclick="cerrarModal()">Cerrar</button>';
    h += '<button class="btn btn-primario" onclick="cerrarModal();irSiguiente(\'experiencia-laboral.html\')">Continuar ➜</button></div>';
    document.getElementById("modalContenido").innerHTML = h; document.getElementById("modalOverlay").classList.add("activo");
}

// EXPERIENCIA LABORAL
var contadorExperiencias = 0;
function agregarExperiencia() {
    contadorExperiencias++; var c = document.getElementById("listaExperiencias");
    var div = document.createElement("div"); div.className = "registro-dinamico"; div.id = "experiencia_"+contadorExperiencias; var n = contadorExperiencias;
    var h = '<div class="registro-header"><h4>Experiencia #'+n+'</h4><button type="button" class="btn btn-eliminar" onclick="eliminarRegistro(\'experiencia_'+n+'\')">✕ Eliminar</button></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Empresa o Entidad</label><input type="text" id="empresa_'+n+'"><span class="mensaje-error"></span></div>';
    h += '<div class="campo" id="contTipoEmp_'+n+'"><label>Tipo</label><div class="grupo-radio"><label><input type="radio" name="tipoEmpresa_'+n+'" value="publica"> Pública</label><label><input type="radio" name="tipoEmpresa_'+n+'" value="privada"> Privada</label></div><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>País</label><select id="paisExp_'+n+'">';
    for (var i=0;i<paises.length;i++) h += '<option value="'+paises[i].valor+'">'+paises[i].texto+'</option>';
    h += '</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Departamento</label><select id="deptoExp_'+n+'" onchange="cargarMunicipios(\'deptoExp_'+n+'\',\'municipioExp_'+n+'\')">';
    for (var i=0;i<departamentos.length;i++) h += '<option value="'+departamentos[i].valor+'">'+departamentos[i].texto+'</option>';
    h += '</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Municipio</label><select id="municipioExp_'+n+'"><option value="">-- Seleccionar --</option></select><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Correo Entidad</label><input type="email" id="correoEnt_'+n+'"><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Teléfonos</label><input type="tel" id="telEnt_'+n+'"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Ingreso - Día</label><select id="diaIng_'+n+'">'+opcionesDias()+'</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Mes</label><select id="mesIng_'+n+'">'+opcionesMeses()+'</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Año</label><input type="number" id="anioIng_'+n+'" min="1970" max="2030"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Retiro - Día</label><select id="diaRet_'+n+'">'+opcionesDias()+'</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Mes</label><select id="mesRet_'+n+'">'+opcionesMeses()+'</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Año (vacío=actual)</label><input type="number" id="anioRet_'+n+'" min="1970" max="2030"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Cargo o Contrato</label><input type="text" id="cargo_'+n+'"><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Dependencia</label><input type="text" id="dependencia_'+n+'"><span class="mensaje-error"></span></div></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Dirección</label><input type="text" id="direccionExp_'+n+'"><span class="mensaje-error"></span></div></div>';
    div.innerHTML = h; c.appendChild(div);
}

function guardarExperienciaLaboral() {
    var exp = []; var regs = document.querySelectorAll("#listaExperiencias .registro-dinamico");
    for (var i = 0; i < regs.length; i++) { var id = regs[i].id.replace("experiencia_","");
        exp.push({ empresa:val("empresa_"+id), tipoEmpresa:obtenerRadioValor("tipoEmpresa_"+id), paisEmp:val("paisExp_"+id), deptoEmp:val("deptoExp_"+id), municipioEmp:val("municipioExp_"+id), correoEntidad:val("correoEnt_"+id), telefono:val("telEnt_"+id), fechaIngresoDia:val("diaIng_"+id), fechaIngresoMes:val("mesIng_"+id), fechaIngresoAnio:val("anioIng_"+id), fechaRetiroDia:val("diaRet_"+id), fechaRetiroMes:val("mesRet_"+id), fechaRetiroAnio:val("anioRet_"+id), cargo:val("cargo_"+id), dependencia:val("dependencia_"+id), direccion:val("direccionExp_"+id) });
    }
    hojaVidaActual.experienciaLaboral = exp;
}

function validarExperienciaLaboral() {
    limpiarTodosLosErrores(); var v = true;
    var regs = document.querySelectorAll("#listaExperiencias .registro-dinamico");
    if (regs.length === 0) { mostrarAlerta("alertaGeneral","Agregue al menos una experiencia.","error"); return false; }
    for (var i = 0; i < regs.length; i++) { var id = regs[i].id.replace("experiencia_","");
        if (!validarTextoRequerido("empresa_"+id,"Empresa")) v=false;
        if (!validarRadioRequerido("tipoEmpresa_"+id,"contTipoEmp_"+id,"tipo")) v=false;
        if (!validarTextoRequerido("cargo_"+id,"Cargo")) v=false;
    }
    return v;
}

function previsualizarExperiencia() {
    if (!validarExperienciaLaboral()) { mostrarAlerta("alertaGeneral","Complete los campos.","error"); return; }
    guardarExperienciaLaboral(); var d = hojaVidaActual.experienciaLaboral;
    var h = '<h3>Previsualización - Experiencia Laboral</h3>';
    for (var i=0;i<d.length;i++) { var e=d[i];
        h += '<div style="padding:6px 0;border-bottom:1px solid #eee"><h4 style="color:#2D6A4F">Exp. #'+(i+1)+'</h4>';
        h += datoPrev("Empresa",e.empresa); h += datoPrev("Tipo",e.tipoEmpresa==="publica"?"Pública":"Privada"); h += datoPrev("Cargo",e.cargo);
        var fi=e.fechaIngresoDia+"/"+e.fechaIngresoMes+"/"+e.fechaIngresoAnio; var fr=e.fechaRetiroAnio?e.fechaRetiroDia+"/"+e.fechaRetiroMes+"/"+e.fechaRetiroAnio:"Actual";
        h += datoPrev("Periodo",fi+" — "+fr); h += '</div>'; }
    h += '<div class="modal-botones"><button class="btn btn-secundario" onclick="cerrarModal()">Cerrar</button>';
    h += '<button class="btn btn-primario" onclick="cerrarModal();irSiguiente(\'tiempo-experiencia.html\')">Continuar ➜</button></div>';
    document.getElementById("modalContenido").innerHTML = h; document.getElementById("modalOverlay").classList.add("activo");
}

// TIEMPO EXPERIENCIA
var contadorOcupaciones = 0;
function agregarOcupacion() {
    contadorOcupaciones++; var c = document.getElementById("listaOcupaciones");
    var div = document.createElement("div"); div.className = "registro-dinamico"; div.id = "ocupacion_"+contadorOcupaciones; var n = contadorOcupaciones;
    var h = '<div class="registro-header"><h4>Ocupación #'+n+'</h4><button type="button" class="btn btn-eliminar" onclick="eliminarRegistro(\'ocupacion_'+n+'\');calcularTotalExperiencia()">✕ Eliminar</button></div>';
    h += '<div class="fila-campos"><div class="campo"><label>Ocupación</label><select id="tipoOcup_'+n+'">';
    for (var i=0;i<tiposOcupacion.length;i++) h += '<option value="'+tiposOcupacion[i].valor+'">'+tiposOcupacion[i].texto+'</option>';
    h += '</select><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Años</label><input type="number" id="aniosOcup_'+n+'" min="0" max="50" value="0" oninput="calcularTotalExperiencia()"><span class="mensaje-error"></span></div>';
    h += '<div class="campo"><label>Meses</label><input type="number" id="mesesOcup_'+n+'" min="0" max="11" value="0" oninput="calcularTotalExperiencia()"><span class="mensaje-error"></span></div></div>';
    div.innerHTML = h; c.appendChild(div);
}

function calcularTotalExperiencia() {
    var tA=0, tM=0;
    var regs = document.querySelectorAll("#listaOcupaciones .registro-dinamico");
    for (var i=0;i<regs.length;i++) { var id=regs[i].id.replace("ocupacion_","");
        tA += parseInt(document.getElementById("aniosOcup_"+id).value)||0;
        tM += parseInt(document.getElementById("mesesOcup_"+id).value)||0;
    }
    tA += Math.floor(tM/12); tM = tM%12;
    document.getElementById("totalAnios").textContent = tA;
    document.getElementById("totalMeses").textContent = tM;
}

function guardarTiempoExperiencia() {
    var oc = []; var regs = document.querySelectorAll("#listaOcupaciones .registro-dinamico");
    for (var i=0;i<regs.length;i++) { var id=regs[i].id.replace("ocupacion_","");
        oc.push({ ocupacion:val("tipoOcup_"+id), anios:val("aniosOcup_"+id), mesesTot:val("mesesOcup_"+id) }); }
    hojaVidaActual.tiempoExperiencia = oc;
    hojaVidaActual.totalAnios = document.getElementById("totalAnios").textContent;
    hojaVidaActual.totalMeses = document.getElementById("totalMeses").textContent;
}

function validarTiempoExperiencia() {
    limpiarTodosLosErrores();
    var regs = document.querySelectorAll("#listaOcupaciones .registro-dinamico");
    if (regs.length===0) { mostrarAlerta("alertaGeneral","Agregue al menos una ocupación.","error"); return false; }
    var v=true;
    for (var i=0;i<regs.length;i++) { var id=regs[i].id.replace("ocupacion_",""); if (!validarSelectRequerido("tipoOcup_"+id,"ocupación")) v=false; }
    return v;
}

function previsualizarTiempo() {
    if (!validarTiempoExperiencia()) { mostrarAlerta("alertaGeneral","Complete los campos.","error"); return; }
    guardarTiempoExperiencia(); var d = hojaVidaActual.tiempoExperiencia;
    var h = '<h3>Previsualización - Tiempo Experiencia</h3>';
    for (var i=0;i<d.length;i++) { var t=""; for (var j=0;j<tiposOcupacion.length;j++) if(tiposOcupacion[j].valor===d[i].ocupacion) t=tiposOcupacion[j].texto;
        h += datoPrev(t,d[i].anios+" años, "+d[i].mesesTot+" meses"); }
    h += datoPrev("TOTAL",hojaVidaActual.totalAnios+" años, "+hojaVidaActual.totalMeses+" meses");
    h += '<div class="modal-botones"><button class="btn btn-secundario" onclick="cerrarModal()">Cerrar</button>';
    h += '<button class="btn btn-primario" onclick="cerrarModal();irSiguiente(\'certificacion.html\')">Continuar ➜</button></div>';
    document.getElementById("modalContenido").innerHTML = h; document.getElementById("modalOverlay").classList.add("activo");
}

// CERTIFICACION
function guardarCertificacion() {
    hojaVidaActual.certificacion = { aceptaJuramento: obtenerRadioValor("aceptaJuramento")==="si", observaciones: val("observaciones") };
}
function validarCertificacion() {
    limpiarTodosLosErrores();
    if (obtenerRadioValor("aceptaJuramento")!=="si") {
        var c=document.getElementById("contenedorJuramento"); if(c){c.classList.add("campo-error"); var m=c.querySelector(".mensaje-error"); if(m){m.textContent="Debe aceptar";m.style.display="block";}} return false;
    } return true;
}
function enviarHojaDeVida() {
    if (!validarCertificacion()) { mostrarAlerta("alertaGeneral","Debe aceptar la declaración.","error"); return; }
    guardarCertificacion();
    hojaVidaActual.id = proximoIdHV; hojaVidaActual.estado = "diligenciada";
    hojaVidaActual.fechaCreacion = new Date().toISOString().split("T")[0]; proximoIdHV++;
    hojasDeVida.push(JSON.parse(JSON.stringify(hojaVidaActual)));
    mostrarAlerta("alertaGeneral","¡Hoja de vida enviada! Estado: Diligenciada","exito");
    setTimeout(function(){ window.location.href = "estado-hv.html"; }, 2000);
}
