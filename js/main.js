/* =========================================================
   main.js  –  Lógica, Validaciones y Documentación
   =========================================================
   Este archivo contiene la lógica central para el Formato Único
   de Hoja de Vida, incluyendo validaciones de seguridad,
   cálculos de experiencia y control de navegación.
   ========================================================= */

/**
 * Datos geográficos de Colombia: Departamentos y sus Municipios base.
 * @type {Object.<string, string[]>}
 */
const deptoMuni = {
    "amazonas": ["Leticia"],
    "antioquia": ["Medellín", "Bello", "Itagüí", "Envigado", "Apartadó"],
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
    "cordoba": ["Montería", "Lorica"],
    "cundinamarca": ["Bogotá", "Soacha", "Chía", "Zipaquirá"],
    "guainia": ["Inírida"],
    "guaviare": ["San José del Guaviare"],
    "huila": ["Neiva", "Pitalito"],
    "laguajira": ["Riohacha", "Maicao"],
    "magdalena": ["Santa Marta", "Ciénaga"],
    "meta": ["Villavicencio", "Acacías"],
    "narino": ["Pasto", "Ipiales", "Tumaco"],
    "nortedesantander": ["Cúcuta", "Ocaña", "Pamplona"],
    "putumayo": ["Mocoa", "Puerto Asís"],
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

// ── Helpers de Interfaz ──────────────────────────────────────

/**
 * Marca un campo con error visual y mensaje de validación.
 * @param {HTMLElement} el - Elemento del DOM a marcar.
 * @param {string} msg - Mensaje de error a mostrar.
 */
function marcarError(el, msg) {
    el.style.borderColor = 'var(--error)';
    el.setCustomValidity(msg);
}

/**
 * Limpia los errores visuales y mensajes de un campo.
 * @param {HTMLElement} el - Elemento del DOM a limpiar.
 */
function limpiarError(el) {
    el.style.borderColor = '';
    el.setCustomValidity('');
}

/**
 * Muestra u oculta la alerta general del formulario.
 * @param {string} msg - Mensaje a mostrar (vacío para ocultar).
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

// ── Inicialización General ───────────────────────────────────

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
});

function inicializarAlerta() {
    const div = document.getElementById('alertaGeneral');
    if (div) div.style.display = 'none';
}

// ── Lógica de Bloqueo de Navegación ──────────────────────────

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
                // Si el formulario no es válido, prevenimos la navegación del link
                if (!form.reportValidity()) {
                    e.preventDefault();
                    mostrarAlerta('Debe completar correctamente todos los campos marcados con (*) antes de navegar a otra sección.');
                }
            }
        });
    });
}

// ── Validación de campos de texto (solo letras) ───────────

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
            const sinNumeros = el.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚüÜñÑ\s\-']/g, '');
            if (el.value !== sinNumeros) el.value = sinNumeros;
            limpiarError(el);
        });

        // Validación al perder el foco
        el.addEventListener('blur', () => {
            const val = el.value.trim();
            if (el.required && val === '') {
                marcarError(el, 'Este campo es obligatorio.');
            } else if (val.length > 0 && val.length < 2) {
                marcarError(el, 'Ingrese al menos 2 caracteres.');
            } else {
                limpiarError(el);
            }
        });
    });
}

// ── Validación número de documento ──────────────────────────

function initValidacionDocumento() {
    const doc = document.getElementById('numeroDocumento');
    if (!doc) return;

    doc.addEventListener('input', () => {
        doc.value = doc.value.replace(/\D/g, ''); // Solo dígitos
        limpiarError(doc);
    });

    doc.addEventListener('blur', () => {
        const val = doc.value.trim();
        if (val === '') {
            if (doc.required) marcarError(doc, 'El número de documento es obligatorio.');
            return;
        }
        if (val.length < 6 || val.length > 12) {
            marcarError(doc, 'El número de documento debe tener entre 6 y 12 dígitos.');
            return;
        }
        limpiarError(doc);
    });
}

// ── Validación teléfono ──────────────────────────────────────

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
                if (el.required) marcarError(el, 'El teléfono es obligatorio.');
                return;
            }
            const soloDigitos = val.replace('+', '');
            if (soloDigitos.length < 7 || soloDigitos.length > 13) {
                marcarError(el, 'Ingrese un número de teléfono válido (7 a 13 dígitos).');
                return;
            }
            limpiarError(el);
        });
    });
}

// ── Validación de correo electrónico ────────────────────────

function initValidacionEmail() {
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    const ids = ['email', 'correoEnt_1'];

    ids.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;

        el.addEventListener('blur', () => {
            const val = el.value.trim();
            if (val === '') {
                if (el.required) marcarError(el, 'El correo electrónico es obligatorio.');
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

// ── Libreta Militar: solo visible si sexo = Masculino ────────

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
}

// ── Nacionalidad: mostrar/ocultar campo País ─────────────────

function initNacionalidad() {
    const nacRadios = document.querySelectorAll('input[name="nacionalidad"]');
    const paisNacEl = document.getElementById('paisNacionalidad');
    const contenedorPais = paisNacEl && paisNacEl.closest('.campo');
    if (!contenedorPais || nacRadios.length === 0) return;

    function togglePaisNac() {
        const esExtranjero = [...nacRadios].some(r => r.value === 'EXT' && r.checked);
        contenedorPais.style.display = esExtranjero ? '' : 'none';
        if (paisNacEl) paisNacEl.required = esExtranjero;
    }

    nacRadios.forEach(r => r.addEventListener('change', togglePaisNac));
    togglePaisNac();
}

// ── Gestión de Fechas y Edad (Mínimo 18 años) ────────────────

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
                    marcarError(input, 'Para cumplir la mayoría de edad (18 años), el año máximo permitido es 2008.');
                }
            } else if (v < ANIO_MIN) {
                marcarError(input, `El año no puede ser menor a ${ANIO_MIN}.`);
            } else {
                limpiarError(input);
            }
        });
    });

    /** Calcula la edad exacta basándose en día, mes y año */
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

    // Actualización dinámica de días según el mes y año
    function actualizarDias() {
        if (!nacDia || !nacMes) return;
        
        const mes = nacMes.value;
        const anioVal = nacAnio ? nacAnio.value : "";
        const anio = anioVal ? parseInt(anioVal) : 2000;
        
        // Si no hay mes, por defecto permitimos 31 días
        let maxDia = 31;
        if (mes) {
            maxDia = new Date(anio, parseInt(mes), 0).getDate();
        }

        const prevVal = nacDia.value;
        let html = '<option value="" disabled selected> Día </option>';
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

// ── Ubicaciones Dinámicas ────────────────────────────────────

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

// ── Experiencia Laboral y Cálculos ───────────────────────────

function initExperienciaLogica() {
    // Cálculo automático del total en la página 4
    const totalAnios = document.querySelector('input[name="totalAnios"]');
    const totalMeses = document.querySelector('input[name="totalMeses"]');

    if (totalAnios && totalMeses) {
        const ocupAnios = document.getElementById('aniosOcup_1');
        const ocupMeses = document.getElementById('mesesOcup_1');

        totalAnios.readOnly = true;
        totalMeses.readOnly = true;

        function calcularTotal() {
            let a = Math.max(0, parseInt(ocupAnios.value) || 0);
            let m = Math.max(0, parseInt(ocupMeses.value) || 0);

            // Normalización: 12 meses -> 1 año
            a += Math.floor(m / 12);
            m = m % 12;

            totalAnios.value = a;
            totalMeses.value = m;
        }

        if (ocupAnios && ocupMeses) {
            ocupAnios.addEventListener('input', calcularTotal);
            ocupMeses.addEventListener('input', calcularTotal);
            calcularTotal();
        }
    }

    // Validación cronológica (Ingreso vs Retiro) en la página 3
    const anioIng = document.getElementById('anioIng_1');
    const anioRet = document.getElementById('anioRet_1');
    const mesIng = document.getElementById('mesIng_1');
    const mesRet = document.getElementById('mesRet_1');

    if (anioIng && anioRet && mesIng && mesRet) {
        function validarCronologia() {
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

        [anioIng, anioRet, mesIng, mesRet].forEach(el => {
            el.addEventListener('change', validarCronologia);
            if (el.tagName === 'INPUT') el.addEventListener('blur', validarCronologia);
        });
    }
}

// ── Validación Global al Enviar ──────────────────────────────

function initValidacionFormulario() {
    const form = document.querySelector('form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
        if (!form.checkValidity()) {
            e.preventDefault();
            e.stopPropagation();
            mostrarAlerta('Por favor, complete todos los campos obligatorios resaltados.');
            
            // Scroll al primer error
            const primerError = form.querySelector(':invalid');
            if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });

    // Limpiar alertas cuando el usuario interactúa
    form.addEventListener('input', () => mostrarAlerta(''));
    form.addEventListener('change', () => mostrarAlerta(''));
}
