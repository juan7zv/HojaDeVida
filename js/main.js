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

document.addEventListener('DOMContentLoaded', () => {
    initFechas();
    initUbicaciones();
    initExperienciaLogica();
});

function initFechas() {
    // 2. Años: min 1941, max 2026
    const inputsAnio = document.querySelectorAll('input[type="number"][id*="Anio"], input[type="number"][id*="anio"]');
    inputsAnio.forEach(input => {
        input.min = 1941;
        input.max = 2026;
        input.addEventListener('input', () => {
            if (input.value && input.value > 2026) input.value = 2026;
        });
        input.addEventListener('blur', () => {
            if (input.value && input.value < 1941) input.value = 1941;
        });
    });

    // 1. Días dinámicos por mes (1-31, 28 en feb)
    const nacDia = document.getElementById('nacDia');
    const nacMes = document.getElementById('nacMes');
    const nacAnio = document.getElementById('nacAnio');

    if (nacDia && nacMes) {
        function actualizarDias() {
            let mes = nacMes.value;
            let anio = nacAnio ? parseInt(nacAnio.value) : 2026;

            let diasTotales = 31;
            if (mes === '02') {
                // bisiesto o defaults 28 (si no hay año aún, 28)
                diasTotales = (!anio || isNaN(anio) || ((anio % 4 !== 0 || anio % 100 === 0) && anio % 400 !== 0)) ? 28 : 29;
            } else if (['04', '06', '09', '11'].includes(mes)) {
                diasTotales = 30;
            }

            let d = new Date();
            if (anio === d.getFullYear() && parseInt(mes) === (d.getMonth() + 1)) {
                if (diasTotales > d.getDate()) {
                    diasTotales = d.getDate();
                }
            }

            let currentVal = nacDia.value;
            let optionsHTML = '<option value="">-- Día --</option>';
            for (let i = 1; i <= diasTotales; i++) {
                let v = i < 10 ? '0' + i : '' + i;
                optionsHTML += `<option value="${v}">${v}</option>`;
            }
            nacDia.innerHTML = optionsHTML;
            if (currentVal && parseInt(currentVal) <= diasTotales) {
                nacDia.value = currentVal;
            }
        }

        nacMes.addEventListener('change', actualizarDias);

        function actualizarMeses() {
            let anio = nacAnio ? parseInt(nacAnio.value) : 2026;
            let d = new Date();
            let currentMonth = d.getMonth() + 1;
            let currentYear = d.getFullYear();

            let maxMes = (anio === currentYear) ? currentMonth : 12;
            let currentVal = nacMes.value;

            let monthNames = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
            let optionsHTML = '<option value="">-- Mes --</option>';

            for (let i = 0; i < maxMes; i++) {
                let v = (i + 1) < 10 ? '0' + (i + 1) : '' + (i + 1);
                optionsHTML += `<option value="${v}">${monthNames[i]}</option>`;
            }
            nacMes.innerHTML = optionsHTML;
            if (currentVal && parseInt(currentVal) <= maxMes) {
                nacMes.value = currentVal;
            } else {
                nacMes.value = '';
            }
            actualizarDias();
        }

        if (nacAnio) {
            nacAnio.addEventListener('input', actualizarMeses);
            nacAnio.addEventListener('blur', actualizarMeses);
        }
        actualizarMeses();
    }
}

function initUbicaciones() {
    // 3. País, Departamento y Municipio dinámico
    const grupos = [
        { pais: 'paisNacionalidad', depto: null, muni: null }, // solo pais
        { pais: 'paisNac', depto: 'deptoNac', muni: 'municipioNac' },
        { pais: 'paisCorr', depto: 'deptoCorr', muni: 'municipioCorr' },
        { pais: 'paisExp_1', depto: 'deptoExp_1', muni: 'municipioExp_1' }
    ];

    grupos.forEach(grupo => {
        const paisEl = document.getElementById(grupo.pais);
        const deptoEl = grupo.depto ? document.getElementById(grupo.depto) : null;
        const muniEl = grupo.muni ? document.getElementById(grupo.muni) : null;

        if (paisEl && deptoEl && muniEl) {
            paisEl.innerHTML = '<option value="colombia">Colombia</option><option value="extranjero">Extranjero</option>';
            paisEl.addEventListener('change', () => actualizarUbicacion(paisEl, deptoEl, muniEl));
            deptoEl.addEventListener('change', () => actualizarMunicipios(deptoEl, muniEl));
            // Trigger init estado inicial
            actualizarUbicacion(paisEl, deptoEl, muniEl);
        } else if (paisEl && !deptoEl && !muniEl) {
            paisEl.innerHTML = '<option value="colombia">Colombia</option><option value="extranjero">Extranjero</option>';
        }
    });
}

function actualizarUbicacion(paisEl, deptoEl, muniEl) {
    if (paisEl.value.toLowerCase() === 'colombia') {
        deptoEl.innerHTML = '<option value="">-- Seleccionar --</option>';
        Object.keys(deptoMuni).forEach(key => {
            let nombre = key.charAt(0).toUpperCase() + key.slice(1);
            deptoEl.innerHTML += `<option value="${key}">${nombre}</option>`;
        });
        deptoEl.disabled = false;

        muniEl.innerHTML = '<option value="">-- Seleccionar --</option>';
        muniEl.disabled = false;
    } else {
        deptoEl.innerHTML = '<option value="otro">Otro</option>';
        deptoEl.disabled = true;

        muniEl.innerHTML = '<option value="otro">Otro</option>';
        muniEl.disabled = true;
    }
}

function actualizarMunicipios(deptoEl, muniEl) {
    const depto = deptoEl.value;
    muniEl.innerHTML = '<option value="">-- Seleccionar --</option>';
    if (depto && deptoMuni[depto]) {
        deptoMuni[depto].forEach(m => {
            muniEl.innerHTML += `<option value="${m}">${m}</option>`;
        });
    }
}

function initExperienciaLogica() {
    // 5. Cálculo y validaciones de tiempo de experiencia
    const totalAnios = document.querySelector('input[name="totalAnios"]');
    const totalMeses = document.querySelector('input[name="totalMeses"]');

    if (totalAnios && totalMeses) {
        // Estamos en tiempo-experiencia.html
        const ocupAnios = document.getElementById('aniosOcup_1');
        const ocupMeses = document.getElementById('mesesOcup_1');

        function calcularTotal() {
            let anios = parseInt(ocupAnios.value) || 0;
            let meses = parseInt(ocupMeses.value) || 0;

            if (meses < 0) { meses = 0; ocupMeses.value = 0; }
            while (meses >= 12) {
                anios++;
                meses -= 12;
            }
            ocupMeses.value = meses;

            if (anios < 0) { anios = 0; ocupAnios.value = 0; }

            totalAnios.value = anios;
            totalMeses.value = meses;
        }

        if (ocupAnios && ocupMeses) {
            ocupAnios.addEventListener('input', calcularTotal);
            ocupMeses.addEventListener('input', calcularTotal);
            calcularTotal();
        }

        // Bloquear campos de sumatoria final porque son automáticos
        totalAnios.readOnly = true;
        totalMeses.readOnly = true;
        totalAnios.style.backgroundColor = '#E9ECEF';
        totalMeses.style.backgroundColor = '#E9ECEF';
    }

    // Validación cronológica en experiencia-laboral.html
    const anioIng_1 = document.getElementById('anioIng_1');
    const anioRet_1 = document.getElementById('anioRet_1');
    const mesIng_1 = document.getElementById('mesIng_1');
    const mesRet_1 = document.getElementById('mesRet_1');

    if (anioIng_1 && anioRet_1 && mesIng_1 && mesRet_1) {
        function validarFechasExp() {
            let aIng = parseInt(anioIng_1.value) || 0;
            let aRet = parseInt(anioRet_1.value);
            if (isNaN(aRet)) aRet = 2026; // Si está vacío se asume actual
            let mIng = parseInt(mesIng_1.value) || 1;
            let mRet = parseInt(mesRet_1.value) || 12;

            if (aIng > 0 && aRet > 0) {
                if (aIng > aRet || (aIng === aRet && mIng > mRet)) {
                    anioRet_1.style.borderColor = 'var(--error)';
                    mesRet_1.style.borderColor = 'var(--error)';
                    anioRet_1.setCustomValidity("Fecha de retiro no puede ser menor a ingreso.");
                } else {
                    anioRet_1.style.borderColor = '';
                    mesRet_1.style.borderColor = '';
                    anioRet_1.setCustomValidity("");
                }
            }
        }
        anioIng_1.addEventListener('blur', validarFechasExp);
        anioRet_1.addEventListener('blur', validarFechasExp);
        mesIng_1.addEventListener('change', validarFechasExp);
        mesRet_1.addEventListener('change', validarFechasExp);
    }
}
