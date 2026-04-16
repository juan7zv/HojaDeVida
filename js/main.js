/* =========================================================
   main.js  â€“  Lógica, Validaciones y Documentación
   =========================================================
   Este archivo contiene la lógica central para el Formato íšnico
   de Hoja de Vida, incluyendo validaciones de seguridad,
   cálculos de experiencia y control de navegación.
   ========================================================= */

/**
 * Datos geográficos de Colombia: Departamentos y sus Municipios base.
 * @type {Object.<string, string[]>}
 */
const deptoMuni = {
    "amazonas": ["Leticia"],
    "antioquia": ["Medellí­n", "Bello", "Itagí¼í­", "Envigado", "Apartadó"],
    "arauca": ["Arauca", "Arauquita", "Tame"],
    "atlantico": ["Barranquilla", "Soledad", "Malambo"],
    "bolivar": ["Cartagena", "Magangué", "Turbaco"],
    "boyaca": ["Tunja", "Sogamoso", "Duitama"],
    "caldas": ["Manizales", "La Dorada", "Chinchiná"],
    "caqueta": ["Florencia"],
    "casanare": ["Yopal"],
    "cauca": ["Popayán", "Santander de Quilichao"],
    "cesar": ["Valledupar", "Aguachica"],
    "choco": ["Quibdó"],
    "cordoba": ["Monterí­a", "Lorica"],
    "cundinamarca": ["Bogotá", "Soacha", "Chí­a", "Zipaquirá"],
    "guainia": ["Iní­rida"],
    "guaviare": ["San José del Guaviare"],
    "huila": ["Neiva", "Pitalito"],
    "laguajira": ["Riohacha", "Maicao"],
    "magdalena": ["Santa Marta", "Ciénaga"],
    "meta": ["Villavicencio", "Acací­as"],
    "narino": ["Pasto", "Ipiales", "Tumaco"],
    "nortedesantander": ["Cúcuta", "Ocaña", "Pamplona"],
    "putumayo": ["Mocoa", "Puerto Así­s"],
    "quindio": ["Armenia", "Calarcá"],
    "risaralda": ["Pereira", "Dosquebradas"],
    "sanandres": ["San Andrés"],
    "santander": ["Bucaramanga", "Floridablanca", "Barrancabermeja", "San Gil"],
    "sucre": ["Sincelejo", "Corozal"],
    "tolima": ["Ibagué", "Espinal"],
    "valle": ["Cali", "Buenaventura", "Palmira", "Tuluá", "Yumbo"],
    "vaupes": ["Mitú"],
    "vichada": ["Puerto Carreño"]
};

/** Constantes globales para validación de fechas */
const ANIO_MIN = 1941;
const ANIO_MAX = new Date().getFullYear();

// â”€â”€ Helpers de Interfaz â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Marca un campo con error visual y mensaje de validación.
 * @param {HTMLElement} el - Elemento del DOM a marcar.
 * @param {string} msg - Mensaje de error a mostrar.
 */
function marcarError(el, msg) {
    el.style.borderColor = 'var(--error)';
    el.setCustomValidity(msg);
    // Si es un radio/check, marcar el contenedor
    if (el.type === 'radio' || el.type === 'checkbox') {
        let container = el.closest('.grupo-radio') || el.closest('.grupo-grados') || el.closest('.campo');
        if (container) container.style.border = '1px solid var(--error)';
    }
}

function limpiarError(el) {
    el.style.borderColor = '';
    el.setCustomValidity('');
    // Limpiar border del contenedor también
    let container = el.closest('.grupo-radio') || el.closest('.grupo-grados') || el.closest('.campo');
    if (container) container.style.border = '';
}

/**
 * Muestra u oculta la alerta general del formulario.
 * @param {string} msg - Mensaje a mostrar (vací­o para ocultar).
 */
function mostrarAlerta(msg) {
    const div = document.getElementById('alertaGeneral');
    if (!div) return;
    div.textContent = msg;
    div.style.display = msg ? 'block' : 'none';
}

/**
 * Capitaliza la primera letra de una cadena.
 * @param {string} str 
 * @returns {string}
 */
function capitalizar(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// â”€â”€ Inicialización General â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

document.addEventListener('DOMContentLoaded', () => {
    // Inicializar componentes
    inicializarAlerta();
    initFechas();
    initUbicaciones();
    initValidacionesTexto();
    initValidacionDocumento();
    initValidacionTelefono();
    initValidacionEmail();
    initExperienciaLogica();
    initValidacionFormulario();
    initLibretaMilitar();
    initNacionalidad();
    initBloqueoNavegacion(); // Nueva lógica para bloquear navegación inválida

    // Nuevas integraciones de Admin y Seguridad
    checkAdminSecurity();
    initLogin();
    initAdminPanel();
    initCapturaCV();
});

function inicializarAlerta() {
    const div = document.getElementById('alertaGeneral');
    if (div) div.style.display = 'none';
}

// â”€â”€ Lógica de Bloqueo de Navegación â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

/**
 * Intercepta los clics en la barra de navegación para asegurar
 * que el usuario no pase de sección sin completar los datos requeridos.
 */
function initBloqueoNavegacion() {
    const navLinks = document.querySelectorAll('nav a');
    const form = document.querySelector('form');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            if (form) {
                // Validación personalizada
                if (!validarFormularioCustom(form)) {
                    e.preventDefault();
                    mostrarAlerta('Debe completar correctamente todos los campos obligatorios antes de navegar a otra sección.');
                }
            }
        });
    });
}

// â”€â”€ Validación de campos de texto (solo letras) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initValidacionesTexto() {
    const soloTexto = [
        'primerApellido', 'segundoApellido', 'nombres',
        'tituloBasica', 'nombreEstudio_1',
        'empresa_1', 'cargo_1', 'dependencia_1', 'direccionExp_1'
    ];

    soloTexto.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        // Eliminar números y caracteres especiales mientras escribe
        el.addEventListener('input', () => {
            const sinNumeros = el.value.replace(/[^a-zA-Záéí­óúíí‰íí“íší¼íœñí‘\s\-']/g, '');
            if (el.value !== sinNumeros) el.value = sinNumeros;
            limpiarError(el);
        });

        // Validación al perder el foco
        el.addEventListener('blur', () => {
            const val = el.value.trim();
            if (el.getAttribute('data-required') === 'true' && val === '') {
                marcarError(el, 'Este campo es obligatorio.');
            } else if (val.length > 0 && val.length < 2) {
                marcarError(el, 'Ingrese al menos 2 caracteres.');
            } else {
                limpiarError(el);
            }
        });
    });
}

// â”€â”€ Validación número de documento â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initValidacionDocumento() {
    const doc = document.getElementById('numeroDocumento');
    if (!doc) return;

    doc.addEventListener('input', () => {
        doc.value = doc.value.replace(/\D/g, ''); // Solo dí­gitos
        limpiarError(doc);
    });

    doc.addEventListener('blur', () => {
        const val = doc.value.trim();
        if (val === '') {
            if (doc.getAttribute('data-required') === 'true') marcarError(doc, 'El número de documento es obligatorio.');
            return;
        }
        if (val.length < 6 || val.length > 12) {
            marcarError(doc, 'El número de documento debe tener entre 6 y 12 dí­gitos.');
            return;
        }
        limpiarError(doc);
    });
}

// â”€â”€ Validación teléfono â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initValidacionTelefono() {
    const ids = ['telefono', 'telEnt_1'];
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('input', () => {
            el.value = el.value.replace(/[^\d+\s\-]/g, '');
            limpiarError(el);
        });

        el.addEventListener('blur', () => {
            const val = el.value.trim().replace(/[\s\-]/g, '');
            if (val === '') {
                if (el.getAttribute('data-required') === 'true') marcarError(el, 'El teléfono es obligatorio.');
                return;
            }
            const soloDigitos = val.replace('+', '');
            if (soloDigitos.length < 7 || soloDigitos.length > 13) {
                marcarError(el, 'Ingrese un número de teléfono válido (7 a 13 dí­gitos).');
                return;
            }
            limpiarError(el);
        });
    });
}

// â”€â”€ Validación de correo electrónico â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initValidacionEmail() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const ids = ['email', 'correoEnt_1'];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('blur', () => {
            const val = el.value.trim();
            if (val === '') {
                if (el.getAttribute('data-required') === 'true') marcarError(el, 'El correo electrónico es obligatorio.');
                return;
            }
            if (!regexEmail.test(val)) {
                marcarError(el, 'Ingrese un correo válido. Ej: nombre@dominio.com');
                return;
            }
            limpiarError(el);
        });

        el.addEventListener('input', () => limpiarError(el));
    });
}

// â”€â”€ Libreta Militar: solo visible si sexo = Masculino â”€â”€â”€â”€â”€â”€â”€â”€

function initLibretaMilitar() {
    const sexoRadios = document.querySelectorAll('input[name="sexo"]');
    const libretaNumero = document.getElementById('libretaNumero');
    if (!libretaNumero || sexoRadios.length === 0) return;

    const filaLibreta = libretaNumero.closest('.fila-campos');
    let h3Libreta = null;
    document.querySelectorAll('h3').forEach(h => {
        if (h.textContent.trim().includes('Libreta Militar')) h3Libreta = h;
    });

    function toggleLibreta() {
        const esMasc = [...sexoRadios].some(r => r.value === 'M' && r.checked);
        const display = esMasc ? '' : 'none';
        if (filaLibreta) filaLibreta.style.display = display;
        if (h3Libreta) h3Libreta.style.display = display;

        if (!esMasc) {
            libretaNumero.value = '';
            const distrito = document.getElementById('distritoMilitar');
            if (distrito) distrito.selectedIndex = 0;
            document.querySelectorAll('input[name="libretaClase"]').forEach(r => r.checked = false);
        }
    }

    sexoRadios.forEach(r => r.addEventListener('change', toggleLibreta));
    toggleLibreta();

    // Requisito: Precargar desde arreglos por JS
    const distritos = [];
    for(let i = 1; i <= 60; i++) distritos.push('Distrito Militar ' + i);
    
    const selectDM = document.getElementById('distritoMilitar');
    if (selectDM) {
        let htmlDM = '<option value="" disabled selected>Seleccionar DM</option>';
        distritos.forEach(d => {
            htmlDM += `<option value="${d}">${d}</option>`;
        });
        selectDM.innerHTML = htmlDM;
    }
}

// â”€â”€ Nacionalidad: mostrar/ocultar campo Paí­s â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initNacionalidad() {
    const nacRadios = document.querySelectorAll('input[name="nacionalidad"]');
    const paisNacEl = document.getElementById('paisNacionalidad');
    const contenedorPais = paisNacEl && paisNacEl.closest('.campo');
    if (!contenedorPais || nacRadios.length === 0) return;

    function togglePaisNac() {
        const esExtranjero = [...nacRadios].some(r => r.value === 'EXT' && r.checked);
        contenedorPais.style.display = esExtranjero ? '' : 'none';
        if (paisNacEl) {
            if (esExtranjero) paisNacEl.setAttribute('data-required', 'true');
            else paisNacEl.removeAttribute('data-required');
        }
    }

    nacRadios.forEach(r => r.addEventListener('change', togglePaisNac));
    togglePaisNac();
}

// â”€â”€ Gestión de Fechas y Edad (Mí­nimo 18 años) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initFechas() {
    const inputsAnio = document.querySelectorAll('input[type="number"][id*="Anio"], input[type="number"][id*="anio"]');
    const nacDia = document.getElementById('nacDia');
    const nacMes = document.getElementById('nacMes');
    const nacAnio = document.getElementById('nacAnio');

    inputsAnio.forEach(input => {
        if (/^aniosOcup/i.test(input.id)) return; // Ignorar años de ocupación
        
        // El año máximo general es el actual, pero para nacimiento es 2008 (Ley 18+)
        const esNacimiento = input.id === 'nacAnio';
        const maxPermitido = esNacimiento ? 2008 : ANIO_MAX;
        
        input.min = ANIO_MIN;
        input.max = maxPermitido;

        // Validación al perder el foco
        input.addEventListener('blur', () => {
            const v = parseInt(input.value);
            if (!v) return;
            
            if (v > maxPermitido) {
                input.value = maxPermitido;
                limpiarError(input);
                if (esNacimiento) {
                    marcarError(input, 'Para cumplir la mayorí­a de edad (18 años), el año máximo permitido es 2008.');
                }
            } else if (v < ANIO_MIN) {
                marcarError(input, `El año no puede ser menor a ${ANIO_MIN}.`);
            } else {
                limpiarError(input);
            }
        });
    });

    /** Calcula la edad exacta basándose en dí­a, mes y año */
    function validarEdadLegal() {
        if (!nacDia || !nacMes || !nacAnio) return;
        if (!nacDia.value || !nacMes.value || !nacAnio.value) return;

        const d = parseInt(nacDia.value);
        const m = parseInt(nacMes.value) - 1; // Mes 0-indexed
        const a = parseInt(nacAnio.value);

        if (isNaN(d) || isNaN(m) || isNaN(a)) return;

        const fechaNac = new Date(a, m, d);
        const hoy = new Date();
        
        let edad = hoy.getFullYear() - fechaNac.getFullYear();
        const mesDiff = hoy.getMonth() - fechaNac.getMonth();
        if (mesDiff < 0 || (mesDiff === 0 && hoy.getDate() < fechaNac.getDate())) {
            edad--;
        }

        if (edad < 18) {
            marcarError(nacAnio, 'Debe ser mayor de 18 años para aplicar a este cargo (Ley Colombiana).');
            mostrarAlerta('Debe ser mayor de 18 años para continuar.');
        } else {
            limpiarError(nacAnio);
            mostrarAlerta('');
        }
    }

    // Actualización dinámica de dí­as según el mes y año
    function actualizarDias() {
        if (!nacDia || !nacMes) return;
        
        const mes = nacMes.value;
        const anioVal = nacAnio ? nacAnio.value : "";
        const anio = anioVal ? parseInt(anioVal) : 2000;
        
        // Si no hay mes, por defecto permitimos 31 dí­as
        let maxDia = 31;
        if (mes) {
            maxDia = new Date(anio, parseInt(mes), 0).getDate();
        }

        const prevVal = nacDia.value;
        let html = '<option value="" disabled selected> Dí­a </option>';
        for (let i = 1; i <= maxDia; i++) {
            const v = i < 10 ? '0' + i : '' + i;
            html += `<option value="${v}">${v}</option>`;
        }
        nacDia.innerHTML = html;
        if (prevVal && parseInt(prevVal) <= maxDia) nacDia.value = prevVal;
        validarEdadLegal();
    }

    if (nacDia && nacMes && nacAnio) {
        nacMes.addEventListener('change', actualizarDias);
        nacAnio.addEventListener('input', actualizarDias);
        nacDia.addEventListener('change', validarEdadLegal);
        actualizarDias();
    }
}

// â”€â”€ Ubicaciones Dinámicas â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initUbicaciones() {
    const grupos = [
        { pais: 'paisNac', depto: 'deptoNac', muni: 'municipioNac' },
        { pais: 'paisCorr', depto: 'deptoCorr', muni: 'municipioCorr' },
        { pais: 'paisExp_1', depto: 'deptoExp_1', muni: 'municipioExp_1' }
    ];

    grupos.forEach(({ pais, depto, muni }) => {
        const paisEl = document.getElementById(pais);
        const deptoEl = document.getElementById(depto);
        const muniEl = document.getElementById(muni);
        if (!paisEl || !deptoEl || !muniEl) return;

        paisEl.addEventListener('change', () => actualizarUbicacion(paisEl, deptoEl, muniEl));
        deptoEl.addEventListener('change', () => actualizarMunicipios(deptoEl, muniEl));

        actualizarUbicacion(paisEl, deptoEl, muniEl);
    });
}

function actualizarUbicacion(paisEl, deptoEl, muniEl) {
    if (paisEl.value.toLowerCase() === 'colombia') {
        let html = '<option value="" disabled selected> Seleccionar </option>';
        Object.keys(deptoMuni).sort().forEach(key => {
            html += `<option value="${key}">${capitalizar(key)}</option>`;
        });
        deptoEl.innerHTML = html;
        deptoEl.disabled = false;
        muniEl.innerHTML = '<option value="" disabled selected> Seleccionar </option>';
        muniEl.disabled = false;
    } else {
        deptoEl.innerHTML = '<option value="otro">Otro</option>';
        deptoEl.disabled = true;
        muniEl.innerHTML = '<option value="otro">Otro</option>';
        muniEl.disabled = true;
    }
    limpiarError(deptoEl);
    limpiarError(muniEl);
}

function actualizarMunicipios(deptoEl, muniEl) {
    const depto = deptoEl.value;
    muniEl.innerHTML = '<option value="" disabled selected> Seleccionar </option>';
    if (depto && deptoMuni[depto]) {
        deptoMuni[depto].sort().forEach(m => {
            muniEl.innerHTML += `<option value="${m}">${m}</option>`;
        });
    }
    limpiarError(muniEl);
}

// â”€â”€ Clonación Dinámica de Formularios (Formación, Idiomas, Experiencia) â”€â”€

function clonarRegistroDinámico(contenedorId, baseId, prefix) {
    const contenedor = document.getElementById(contenedorId);
    if (!contenedor) return;

    const baseEl = document.getElementById(baseId);
    if (!baseEl) return;

    // Calcular próximo id
    const currentCount = contenedor.querySelectorAll('.registro-dinamico').length;
    const nextIdx = currentCount + 1;
    if (nextIdx > 15) {
        mostrarAlerta('Ha alcanzado el lí­mite máximo de registros en esta sección.');
        return;
    }

    const unclone = baseEl.cloneNode(true);
    unclone.id = `${prefix}_${nextIdx}`;
    
    // Cambiar titulo
    const h4 = unclone.querySelector('h4');
    if (h4) {
        if(prefix === 'estudio') h4.textContent = `Estudio Superior #${nextIdx}`;
        if(prefix === 'idioma') h4.textContent = `Idioma Extranjero #${nextIdx}`;
        if(prefix === 'experiencia') h4.textContent = `Experiencia Laboral #${nextIdx}`;
    }

    // Limpiar values, quitar checks y reasignar ids y names
    const elements = unclone.querySelectorAll('input, select, textarea');
    elements.forEach(el => {
        if (el.id) el.id = el.id.replace('_1', `_${nextIdx}`);
        if (el.name) el.name = el.name.replace('_1', `_${nextIdx}`);
        
        if (el.type === 'radio' || el.type === 'checkbox') {
            el.checked = false;
        } else {
            el.value = '';
        }
        
        // Remover the custom custom required in clones if not mandatory by default
        if (el.getAttribute('data-required') === 'true') {
            // Se puede mantener requerido o hacerlo opcional
            el.removeAttribute('data-required'); 
        }
        
        limpiarError(el);
    });

    contenedor.appendChild(unclone);
}

window.agregarEstudio = function() {
    clonarRegistroDinámico('listaEstudios', 'estudio_1', 'estudio');
}

window.agregarIdioma = function() {
    clonarRegistroDinámico('listaIdiomas', 'idioma_1', 'idioma');
}

window.agregarExperiencia = function() {
    clonarRegistroDinámico('listaExperiencias', 'experiencia_1', 'experiencia');
}

window.agregarOcupacion = function() {
    clonarRegistroDinámico('listaOcupaciones', 'ocupacion_1', 'ocupacion');
    initExperienciaLogica(); // Re-bind listeners
}

// â”€â”€ Experiencia Laboral y Cálculos â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initExperienciaLogica() {
    // Cálculo automático del total en la página 4
    const totalAnios = document.querySelector('input[name="totalAnios"]');
    const totalMeses = document.querySelector('input[name="totalMeses"]');

    if (totalAnios && totalMeses) {
        totalAnios.readOnly = true;
        totalMeses.readOnly = true;

        function calcularTotal() {
            let totalA = 0;
            let totalM = 0;

            const ocupAniosNodes = document.querySelectorAll('input[id^="aniosOcup_"]');
            const ocupMesesNodes = document.querySelectorAll('input[id^="mesesOcup_"]');
            
            ocupAniosNodes.forEach(el => totalA += Math.max(0, parseInt(el.value) || 0));
            ocupMesesNodes.forEach(el => totalM += Math.max(0, parseInt(el.value) || 0));

            // Normalización: 12 meses -> 1 año
            totalA += Math.floor(totalM / 12);
            totalM = totalM % 12;

            totalAnios.value = totalA;
            totalMeses.value = totalM;
        }

        const inputsOcupArray = document.querySelectorAll('input[id^="aniosOcup_"], input[id^="mesesOcup_"]');
        inputsOcupArray.forEach(el => {
            el.removeEventListener('input', calcularTotal);
            el.addEventListener('input', calcularTotal);
        });
        
        calcularTotal();
    }

    // Validación cronológica (Ingreso vs Retiro) en la página 3
    const asIng = document.querySelectorAll('input[id^="anioIng_"]');
    if (asIng.length > 0) {
        function validarCronologia(idx) {
            const anioIng = document.getElementById('anioIng_' + idx);
            const anioRet = document.getElementById('anioRet_' + idx);
            const mesIng = document.getElementById('mesIng_' + idx);
            const mesRet = document.getElementById('mesRet_' + idx);
            if (!anioIng || !anioRet || !mesIng || !mesRet) return;

            const aIng = parseInt(anioIng.value) || 0;
            const aRet = parseInt(anioRet.value) || ANIO_MAX;
            const mIng = parseInt(mesIng.value) || 1;
            const mRet = parseInt(mesRet.value) || 12;

            if (aIng > 0) {
                const ingTS = aIng * 12 + mIng;
                const retTS = aRet * 12 + mRet;
                const hoyTS = ANIO_MAX * 12 + (new Date().getMonth() + 1);

                if (ingTS > hoyTS) {
                    marcarError(anioIng, 'La fecha de ingreso no puede ser futura.');
                } else {
                    limpiarError(anioIng);
                }

                if (ingTS > retTS) {
                    marcarError(anioRet, 'La fecha de retiro debe ser posterior al ingreso.');
                } else {
                    limpiarError(anioRet);
                }
            }
        }
        
        const countExp = document.querySelectorAll('.registro-dinamico[id^="experiencia_"]').length;
        for (let idx = 1; idx <= countExp; idx++) {
            ['anioIng_', 'anioRet_', 'mesIng_', 'mesRet_'].forEach(prefix => {
                const el = document.getElementById(prefix + idx);
                if (el) {
                    el.removeEventListener('change', () => validarCronologia(idx));
                    el.addEventListener('change', () => validarCronologia(idx));
                    if (el.tagName === 'INPUT') {
                        el.removeEventListener('blur', () => validarCronologia(idx));
                        el.addEventListener('blur', () => validarCronologia(idx));
                    }
                }
            });
        }
    }
}

// â”€â”€ Validación Global al Enviar â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function validarFormularioCustom(form) {
    let esValido = true;
    let primerError = null;

    const elementos = form.querySelectorAll('input, select, textarea');
    
    // 1. Limpieza total previa (incluyendo contenedores)
    elementos.forEach(el => limpiarError(el));

    const radiosValidados = new Set();

    // 2. Validación uno por uno
    elementos.forEach(el => {
        // Ignorar campos deshabilitados u ocultos
        if (el.disabled || el.type === 'hidden' || el.closest('[style*="display: none"]')) return;

        const val = el.value ? el.value.trim() : '';
        const esRequerido = el.getAttribute('data-required') === 'true';

        if (esRequerido) {
            if (el.type === 'radio' || el.type === 'checkbox') {
                if (el.name) {
                    if (radiosValidados.has(el.name)) return;
                    radiosValidados.add(el.name);
                    const checked = form.querySelector(`input[name="${el.name}"]:checked`);
                    if (!checked) {
                        esValido = false;
                        marcarError(el, 'Seleccione una opción obligatoria.');
                        if (!primerError) primerError = el;
                    }
                } else if (!el.checked) {
                    esValido = false;
                    marcarError(el, 'Marque esta casilla obligatoria.');
                    if (!primerError) primerError = el;
                }
            } else if (el.tagName === 'SELECT') {
                // Un select es inválido si no tiene valor o es el placeholder
                if (!val || val === "" || val === "0" || val.toLowerCase().includes('seleccionar')) {
                    // Excepción: Si es ubicación y es extranjero, 'otro' es válido (ya manejado por val === "" arriba)
                    marcarError(el, 'Seleccione una opción de la lista.');
                    esValido = false;
                    if (!primerError) primerError = el;
                }
            } else if (val === '') {
                marcarError(el, 'Este campo es obligatorio.');
                esValido = false;
                if (!primerError) primerError = el;
            }
        }

        // 3. Validación de Longitudes Mínimas (si tiene contenido)
        if (val !== '' && el.tagName !== 'SELECT' && el.type !== 'radio' && el.type !== 'checkbox') {
            if (el.id === 'numeroDocumento' && (val.length < 6 || val.length > 12)) {
                marcarError(el, 'El documento debe tener entre 6 y 12 dígitos.');
                esValido = false;
                if (!primerError) primerError = el;
            } else if (el.type === 'text' && val.length < 2 && esRequerido) {
                marcarError(el, 'Debe tener al menos 2 caracteres.');
                esValido = false;
                if (!primerError) primerError = el;
            }
        }

        // 4. Validación Nativa del Navegador (Email, etc)
        if (val !== '' && !el.checkValidity()) {
            marcarError(el, el.validationMessage);
            esValido = false;
            if (!primerError) primerError = el;
        }
    });

    // Scrolleo al primer error para UX
    if (!esValido && primerError) {
        const target = primerError.closest('.campo') || primerError.closest('.grupo-radio') || primerError;
        if (target.scrollIntoView) target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    return esValido;
}


function initValidacionFormulario() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!validarFormularioCustom(form)) {
            e.preventDefault();
            e.stopPropagation();
            mostrarAlerta('Por favor, complete todos los campos obligatorios resaltados.');
        }
    });

    // Limpiar alertas cuando el usuario interactúa
    form.addEventListener('input', () => mostrarAlerta(''));
    form.addEventListener('change', () => mostrarAlerta(''));
}

// â”€â”€ Lógica de Login Admin y Seguridad â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initLogin() {
    const loginForm = document.getElementById('loginAdminForm');
    const errorDiv = document.getElementById('loginError');

    if (!loginForm) return;

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const user = document.getElementById('adminUser').value;
        const pass = document.getElementById('adminPass').value;

        const validAdmins = JSON.parse(localStorage.getItem('adminUsers') || '[{"user":"admin", "pass":"1234"}]');
        const match = validAdmins.find(a => a.user === user && a.pass === pass);

        if (match) {
            localStorage.setItem('hvAdminSession', 'active');
            window.location.href = 'admin.html';
        } else {
            errorDiv.textContent = 'Credenciales incorrectas. Intente nuevamente.';
            errorDiv.style.display = 'block';
        }
    });

    // Validar si ya está iniciada la sesión para no mostrar el login de nuevo
    if (localStorage.getItem('hvAdminSession') === 'active' && window.location.pathname.includes('credenciales.html')) {
        window.location.href = 'admin.html';
    }
}

function checkAdminSecurity() {
    // Si estamos en la página de administración, validar la sesión
    const path = window.location.pathname;
    if (path.includes('admin.html')) {
        if (localStorage.getItem('hvAdminSession') !== 'active') {
            window.location.replace('index.html');
        }

        // Agregar lógica para cerrar sesión
        setTimeout(() => {
            const logoutLinks = document.querySelectorAll('nav a');
            logoutLinks.forEach(link => {
                if(link.textContent.includes('Cerrar Sesión')){
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('hvAdminSession');
                        window.location.replace('index.html');
                    });
                }
            });
        }, 100);
    }
}

// â”€â”€ Captura Distribuida de CV en LocalStorage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initCapturaCV() {
    const form = document.querySelector('form');
    if (!form) return;

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';

    // Cargar datos guardados previamente
    cargarDatosFormulario(form, currentPath);

    // Guardado preventivo en tiempo real (evita pérdidas al retroceder)
    form.addEventListener('input', () => guardarDatosProgreso(form, currentPath));
    form.addEventListener('change', () => guardarDatosProgreso(form, currentPath));

    form.addEventListener('submit', (e) => {
        if (!validarFormularioCustom(form)) {
            e.preventDefault();
            return;
        }

        // Guardar última vez antes de navegar
        guardarDatosProgreso(form, currentPath);

        // Si estamos en la última página (certificación), procesamos el guardado final
        if (currentPath.includes('certificacion.html')) {
            const acceptEl = document.querySelector('input[name="aceptaJuramento"]:checked');
            if (acceptEl && acceptEl.value === 'si') {
                e.preventDefault();

                let hvList = JSON.parse(localStorage.getItem('hvList') || '[]');
                let tempHV = JSON.parse(sessionStorage.getItem('tempHV') || '{}');

                const id = hvList.length > 0 ? hvList[hvList.length - 1].id + 1 : 1;
                const fecha = new Date().toISOString().split('T')[0];

                // Extraemos nombre y documento
                let dPers = {};
                // Buscar en las llaves que puedan contener los datos personales
                for(let key in tempHV) {
                    if(key.includes('datos-personales')) dPers = tempHV[key];
                }

                const doc = dPers['numeroDocumento'] || 'No Especificado';
                const nom = dPers['nombres'] ? `${dPers['nombres']} ${dPers['primerApellido']} ${dPers['segundoApellido'] || ''}`.trim() : 'Usuario Anónimo';

                const newHV = {
                    id: id,
                    nombreCompleto: nom,
                    documento: doc,
                    fecha: fecha,
                    estado: 'diligenciada',
                    detalleCompleto: tempHV
                };

                hvList.push(newHV);
                localStorage.setItem('hvList', JSON.stringify(hvList));
                sessionStorage.removeItem('tempHV');

                agregarHistorial(`Recibida nueva Hoja de Vida de ${nom} (Doc: ${doc})`);
                window.location.href = 'estado-hv.html';
            }
        }
    });
}

function guardarDatosProgreso(form, path) {
    let curData = JSON.parse(sessionStorage.getItem('tempHV') || '{}');
    let formObj = {};
    const inputs = form.querySelectorAll('input, select, textarea');
    
    inputs.forEach(el => {
        if (el.type === 'button' || el.type === 'submit') return;
        if (el.type === 'radio' || el.type === 'checkbox') {
            if (el.checked) formObj[el.name] = el.value;
        } else {
            const key = el.id || el.name;
            if (key) formObj[key] = el.value;
        }
    });

    curData[path] = formObj;
    sessionStorage.setItem('tempHV', JSON.stringify(curData));
}

function cargarDatosFormulario(form, path) {
    const curData = JSON.parse(sessionStorage.getItem('tempHV') || '{}');
    const pageData = curData[path];
    if (!pageData) return;

    for (let key in pageData) {
        const el = document.getElementById(key) || form.querySelector(`[name="${key}"]`);
        if (!el) {
            // Si el elemento no existe, podría ser un registro dinámico que aún no se ha clonado
            if (key.includes('_')) {
                const parts = key.split('_');
                const prefix = parts[0];
                const idx = parseInt(parts[1]);
                if (idx > 1) {
                    // Intentar clonar hasta llegar al índice necesario
                    for(let i = 2; i <= idx; i++) {
                        const contId = prefix === 'estudio' ? 'listaEstudios' : 
                                     prefix === 'idioma' ? 'listaIdiomas' : 
                                     prefix === 'experiencia' ? 'listaExperiencias' : 
                                     prefix === 'ocupacion' ? 'listaOcupaciones' : null;
                        const baseId = prefix + '_1';
                        if (contId && !document.getElementById(prefix + '_' + i)) {
                            clonarRegistroDinámico(contId, baseId, prefix);
                        }
                    }
                    // Re-intentar obtener el elemento tras clonar
                    const newEl = document.getElementById(key) || form.querySelector(`[name="${key}"]`);
                    if (newEl) setElementValue(newEl, pageData[key]);
                }
            }
            continue;
        }
        setElementValue(el, pageData[key]);
    }

    // Disparar cálculos iniciales
    if (typeof initExperienciaLogica === 'function') initExperienciaLogica();
    if (typeof initLibretaMilitar === 'function') initLibretaMilitar();
    if (typeof initNacionalidad === 'function') initNacionalidad();
}

function setElementValue(el, value) {
    if (el.type === 'radio' || el.type === 'checkbox') {
        const target = el.form.querySelector(`input[name="${el.name}"][value="${value}"]`);
        if (target) target.checked = true;
    } else {
        el.value = value;
        // Disparar evento change para que carguen dependencias (como municipios)
        el.dispatchEvent(new Event('change', { bubbles: true }));
    }
}


// â”€â”€ Lógica Dinámica del Panel Administrador â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

function initAdminPanel() {
    const tablaBody = document.getElementById('tablaHVBody');
    if (!tablaBody) return; // Si no hay tabla, no estamos en el admin o cargó mal

    let hvList = JSON.parse(localStorage.getItem('hvList') || '[]');
    renderTabla(hvList.filter(hv => hv.estado === 'diligenciada'));
}

function renderTabla(lista) {
    const tablaBody = document.getElementById('tablaHVBody');
    if (!tablaBody) return;

    tablaBody.innerHTML = '';

    if (lista.length === 0) {
        tablaBody.innerHTML = `<tr><td colspan="6" style="text-align: center;">No hay hojas de vida registradas aún.</td></tr>`;
        return;
    }

    lista.forEach(hv => {
        let badgeClass = 'badge-diligenciada';
        let badgeText = 'Diligenciada';
        let styleBadge = ''; // Color base configurado en CSS para diligenciada

        // Personalización de badges por estado
        if (hv.estado === 'aceptada') {
            badgeClass = 'badge-aceptada';
            badgeText = 'Aceptada';
        } else if (hv.estado === 'rechazada') {
            badgeClass = ''; // Se usa clase base pero con custom style
            badgeText = 'Rechazada';
            styleBadge = 'background-color: var(--error); color: white; display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;';
        } else {
            // El fallback se asume como Diligenciada que ya tiene su CSS en estilos.css
        }

        let botonesAccion = '';

        if (hv.estado === 'diligenciada') {
            botonesAccion = `
                <button onclick="cambiarEstadoHV(${hv.id}, 'aceptada', '${hv.nombreCompleto}')" class="btn btn-secundario" style="background:#28a745; color: white; margin-right: 5px; padding: 4px 8px; font-size: 0.75rem;">Aprobar</button>
                <button onclick="cambiarEstadoHV(${hv.id}, 'rechazada', '${hv.nombreCompleto}')" class="btn btn-secundario" style="background:#dc3545; color: white; margin-right: 5px; padding: 4px 8px; font-size: 0.75rem;">Rechazar</button>
            `;
        } else {
             botonesAccion = `<button class="btn btn-secundario" style="padding: 4px 8px; font-size: 0.75rem; margin-right: 5px;" disabled>Revisada</button>`;
        }

        botonesAccion += `<button onclick="abrirModalDetalle(${hv.id})" class="btn btn-secundario" style="padding: 4px 8px; font-size: 0.75rem;">Ver Detalle</button>`;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${hv.id}</td>
            <td>${hv.nombreCompleto}</td>
            <td>C.C ${hv.documento}</td>
            <td>${hv.fecha}</td>
            <td><span class="badge ${badgeClass}" style="${styleBadge}">${badgeText}</span></td>
            <td>${botonesAccion}</td>
        `;
        tablaBody.appendChild(tr);
    });
}

window.cambiarEstadoHV = function(id, nuevoEstado, nombre) {
    let hvList = JSON.parse(localStorage.getItem('hvList') || '[]');
    let obj = hvList.find(hv => hv.id === id);
    if (obj) {
        obj.estado = nuevoEstado;
        localStorage.setItem('hvList', JSON.stringify(hvList));
        initAdminPanel(); // reescribimos la tabla
        
        const fechaMsg = new Date().toISOString().split('T')[0];
        agregarHistorial(`Administrador cambió el estado a "${capitalizar(nuevoEstado)}" para la HV de ${nombre} el ${fechaMsg}`);
    }
}

// Global hook para el renderizado del historial en el HTML
window.agregarHistorial = function(mensaje) {
    let log = JSON.parse(localStorage.getItem('hvHistory') || '[]');
    log.unshift({
        time: new Date().toLocaleString(),
        msg: mensaje
    });
    // Guardar maximo los ultimos 50
    if (log.length > 50) log = log.slice(0, 50);
    localStorage.setItem('hvHistory', JSON.stringify(log));

    // Si estamos en la pagina admin, forzar re-render del log
    renderHistorialAdmin();
}

function renderHistorialAdmin() {
    const tbody = document.getElementById('tablaHistorialBody');
    if (!tbody) return;

    let lista = JSON.parse(localStorage.getItem('hvList') || '[]');
    tbody.innerHTML = '';

    if (lista.length === 0) {
        tbody.innerHTML = `<tr><td colspan="3" style="text-align: center; padding: 15px;">No hay hojas de vida registradas aún.</td></tr>`;
        return;
    }

    lista.forEach(hv => {
        let badgeClass = 'badge-diligenciada';
        let badgeText = 'Pendiente';
        let styleBadge = '';

        if (hv.estado === 'aceptada') {
            badgeClass = 'badge-aceptada';
            badgeText = 'Aceptada';
        } else if (hv.estado === 'rechazada') {
            badgeClass = ''; 
            badgeText = 'Rechazada';
            styleBadge = 'background-color: var(--error); color: white; display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 0.8rem; font-weight: bold;';
        }

        const tr = document.createElement('tr');
        tr.style.borderBottom = '1px solid #efefef';
        tr.innerHTML = `
            <td style="padding: 10px;">${hv.nombreCompleto}</td>
            <td style="padding: 10px;"><span class="badge ${badgeClass}" style="${styleBadge}">${badgeText}</span></td>
            <td style="padding: 10px; color:#6c757d; font-size:0.85rem;">${hv.fecha}</td>
        `;
        tbody.appendChild(tr);
    });
}

window.switchTab = function(tab) {
    if (tab === 'admin') {
        document.getElementById('vista-admin').style.display = 'block';
        document.getElementById('vista-historial').style.display = 'none';
        document.getElementById('tab-admin').classList.add('paso-activo');
        document.getElementById('tab-admin').style.textDecoration = 'none';
        
        document.getElementById('tab-historial').classList.remove('paso-activo');
        document.getElementById('tab-historial').style.textDecoration = 'underline';
    } else {
        document.getElementById('vista-admin').style.display = 'none';
        document.getElementById('vista-historial').style.display = 'block';
        document.getElementById('tab-historial').classList.add('paso-activo');
        document.getElementById('tab-historial').style.textDecoration = 'none';

        document.getElementById('tab-admin').classList.remove('paso-activo');
        document.getElementById('tab-admin').style.textDecoration = 'underline';
        renderHistorialAdmin();
    }
}

// â”€â”€ Lógica de la Modal de Detalles â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

window.abrirModalDetalle = function(id) {
    let hvList = JSON.parse(localStorage.getItem('hvList') || '[]');
    let hv = hvList.find(c => c.id === id);
    if (!hv) return;

    // Crear el contenedor de la modal si no existe
    let modal = document.getElementById('modalDetalleHV');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalDetalleHV';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.5)';
        modal.style.zIndex = '1000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        let content = document.createElement('div');
        content.id = 'modalDetalleContent';
        content.style.backgroundColor = '#fff';
        content.style.width = '90%';
        content.style.maxWidth = '800px';
        content.style.maxHeight = '90vh';
        content.style.borderRadius = '8px';
        content.style.padding = '25px';
        content.style.overflowY = 'auto';
        content.style.position = 'relative';
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }
    
    // Rellenamos el contenido (Haciendo parse del JSON detalleCompleto)
    // El objeto detalleCompleto contiene bloques como "datos-personales.html": {...}
    
    let htmlDetalles = `
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--primario); padding-bottom: 10px; margin-bottom: 20px;">
            <h2 style="color: var(--primario-oscuro); margin: 0;">Detalle de Hoja de Vida #${hv.id}</h2>
            <button onclick="cerrarModalDetalle()" class="btn btn-secundario" style="padding: 5px 12px; font-weight: bold;">Cerrar âœ•</button>
        </div>
        <div style="margin-bottom: 15px;">
            <strong>Nombre:</strong> ${hv.nombreCompleto} <br>
            <strong>Documento:</strong> ${hv.documento} <br>
            <strong>Estado:</strong> <span style="text-transform: capitalize;">${hv.estado}</span>
        </div>
    `;

    if (hv.detalleCompleto) {
        for (let page in hv.detalleCompleto) {
            let pName = page.replace('.html', '').replace('-', ' ').toUpperCase();
            htmlDetalles += `<div style="background-color: var(--fondo); padding: 15px; border-radius: 6px; margin-bottom: 15px; border-left: 4px solid var(--acento);">`;
            htmlDetalles += `<h4 style="margin-top: 0; margin-bottom: 12px; color: var(--primario); border-bottom: 1px solid #ccc; padding-bottom: 5px;">${pName}</h4>`;
            htmlDetalles += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">`;
            
            for (let prop in hv.detalleCompleto[page]) {
                const val = hv.detalleCompleto[page][prop];
                if (val && val.trim() !== '') {
                    htmlDetalles += `<div><strong style="color: var(--texto-claro); font-size: 0.8rem; text-transform:uppercase;">${prop}:</strong> <p style="margin: 3px 0 10px 0;">${val}</p></div>`;
                }
            }
            htmlDetalles += `</div></div>`;
        }
    } else {
        htmlDetalles += `<p>No hay registro detallado adicional cargado.</p>`;
    }

    document.getElementById('modalDetalleContent').innerHTML = htmlDetalles;
    modal.style.display = 'flex';
}

window.cerrarModalDetalle = function() {
    let modal = document.getElementById('modalDetalleHV');
    if (modal) {
        modal.style.display = 'none';
    }
}

// â”€â”€ Lógica de Vista Previa Local (Usuario) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€

window.abrirVistaPreviaLocal = function() {
    const form = document.querySelector('form');
    if (!form) return;

    // Crear el contenedor de la modal si no existe
    let modal = document.getElementById('modalVistaPrevia');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modalVistaPrevia';
        modal.style.position = 'fixed';
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = '100%';
        modal.style.backgroundColor = 'rgba(0,0,0,0.6)';
        modal.style.zIndex = '2000';
        modal.style.display = 'flex';
        modal.style.justifyContent = 'center';
        modal.style.alignItems = 'center';
        
        let content = document.createElement('div');
        content.id = 'modalVistaPreviaContent';
        content.style.backgroundColor = '#fff';
        content.style.width = '90%';
        content.style.maxWidth = '700px';
        content.style.maxHeight = '90vh';
        content.style.borderRadius = '8px';
        content.style.padding = '25px';
        content.style.overflowY = 'auto';
        
        modal.appendChild(content);
        document.body.appendChild(modal);
    }

    let htmlDetalles = `
        <div style="display: flex; justify-content: space-between; border-bottom: 2px solid var(--primario); padding-bottom: 10px; margin-bottom: 20px;">
            <h2 style="color: var(--primario-oscuro); margin: 0;">Vista Previa de la Sección Actual</h2>
            <button onclick="document.getElementById('modalVistaPrevia').style.display='none'" class="btn btn-secundario" style="padding: 5px 12px; font-weight: bold;">✖ Cerrar</button>
        </div>
        <p style="color:var(--texto-claro); font-size:0.85rem; margin-bottom:15px;">Asegúrese de que esta información es correcta antes de continuar.</p>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
    `;

    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(el => {
        if (el.type === 'radio' && !el.checked) return;
        if (el.type === 'checkbox' && !el.checked) return;
        
        const valor = el.tagName === 'SELECT' ? (el.options[el.selectedIndex]?.text || '') : el.value;
        const nombreCampo = document.querySelector(`label[for="${el.id}"]`)?.textContent || el.name || el.id || 'Campo';

        if (valor.trim() !== '') {
            htmlDetalles += `
                <div style="background:var(--fondo); padding:10px; border-radius:5px; border-left:3px solid var(--acento);">
                    <strong style="color:var(--texto-claro); font-size:0.75rem; text-transform:uppercase;">${nombreCampo}</strong>
                    <p style="margin:5px 0 0 0; color:var(--texto); font-weight:500;">${valor}</p>
                </div>
            `;
        }
    });

    htmlDetalles += `</div>
        <div style="margin-top:20px; text-align:right;">
            <button onclick="document.getElementById('modalVistaPrevia').style.display='none'" class="btn btn-primario">Entendido</button>
        </div>
    `;

    document.getElementById('modalVistaPreviaContent').innerHTML = htmlDetalles;
    modal.style.display = 'flex';
}


// ==========================================
// EJECUCIÓN GLOBAL Y GUARDIANES DE SEGURIDAD
// ==========================================
document.addEventListener('DOMContentLoaded', () => {

    // 1. Lógica de Logout Fuerte (Destruye sesión siempre)
    const logoutLinks = document.querySelectorAll('a, button');
    logoutLinks.forEach(l => {
        if (l.textContent.includes('Cerrar Sesión') || l.classList.contains('btn-logout')) {
            l.addEventListener('click', (e) => {
                e.preventDefault();
                localStorage.removeItem('hvAdminSession');
                window.location.replace('index.html');
            });
        }
    });

    // 2. Guardián de Rutas Anti-Hacking (Evitar Salto de Certificación)
    const URLS_ORDEN = [
        'datos-personales.html',
        'formacion-academica.html',
        'experiencia-laboral.html',
        'tiempo-experiencia.html',
        'certificacion.html'
    ];
    
    const pathParts = window.location.pathname.split('/');
    let curPath = pathParts[pathParts.length - 1].split('?')[0];

    // Limpiar datos temporales si volvemos al index (Requisito: solo persiste en secciones)
    if (curPath === 'index.html' || curPath === '') {
        sessionStorage.removeItem('tempHV');
    }
    
    const curIdx = URLS_ORDEN.indexOf(curPath);

    if (curIdx > 0) {
        const tempHV = JSON.parse(sessionStorage.getItem('tempHV') || '{}');
        const prevKey = URLS_ORDEN[curIdx - 1]; // Paso inmediatamente anterior que debió ser llenado
        
        // Verificamos si en la memoria temporal existen datos del paso anterior
        if (!tempHV[prevKey] && !tempHV[prevKey.replace('.html', '')]) { 
            // Trampa detectada
            sessionStorage.setItem('trampaMsg', 'Acceso denegado: Por favor diligencie su Hoja de Vida en orden secuencial.');
            window.location.replace('datos-personales.html');
            return;
        }
    }

    // 3. Captura y Mostrar Mensaje de Trampa
    if (curPath === 'datos-personales.html') {
        const msg = sessionStorage.getItem('trampaMsg');
        if (msg) {
            setTimeout(() => {
                mostrarAlerta(msg);
                sessionStorage.removeItem('trampaMsg');
            }, 500); // 500ms para asegurar DOM renderizado
        }
    }
    
    // 4. Inicializadores Globales Seguros
    if (typeof checkAdminSecurity === 'function') checkAdminSecurity();
    if (typeof initLogin === 'function') initLogin();
    if (typeof initValidacionFormulario === 'function') initValidacionFormulario();
    if (typeof initCapturaCV === 'function') initCapturaCV();
    if (typeof initAdminPanel === 'function') initAdminPanel();
    if (typeof initNacionalidadLogica === 'function') initNacionalidadLogica();
    if (typeof initLibretaMilitar === 'function') initLibretaMilitar();
    if (typeof initExperienciaLogica === 'function') initExperienciaLogica();
});