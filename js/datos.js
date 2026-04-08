/* ============================================
   DATOS PRECARGADOS
   Colecciones para selects y formularios
   ============================================ */

// Departamentos y municipios de Colombia (seleccion representativa)
var departamentos = [
    { valor: "", texto: "-- Seleccionar --" },
    { valor: "amazonas", texto: "Amazonas" },
    { valor: "antioquia", texto: "Antioquia" },
    { valor: "arauca", texto: "Arauca" },
    { valor: "atlantico", texto: "Atlántico" },
    { valor: "bolivar", texto: "Bolívar" },
    { valor: "boyaca", texto: "Boyacá" },
    { valor: "caldas", texto: "Caldas" },
    { valor: "caqueta", texto: "Caquetá" },
    { valor: "casanare", texto: "Casanare" },
    { valor: "cauca", texto: "Cauca" },
    { valor: "cesar", texto: "Cesar" },
    { valor: "choco", texto: "Chocó" },
    { valor: "cordoba", texto: "Córdoba" },
    { valor: "cundinamarca", texto: "Cundinamarca" },
    { valor: "guainia", texto: "Guainía" },
    { valor: "guaviare", texto: "Guaviare" },
    { valor: "huila", texto: "Huila" },
    { valor: "laguajira", texto: "La Guajira" },
    { valor: "magdalena", texto: "Magdalena" },
    { valor: "meta", texto: "Meta" },
    { valor: "narino", texto: "Nariño" },
    { valor: "nortedesantander", texto: "Norte de Santander" },
    { valor: "putumayo", texto: "Putumayo" },
    { valor: "quindio", texto: "Quindío" },
    { valor: "risaralda", texto: "Risaralda" },
    { valor: "sanandres", texto: "San Andrés y Providencia" },
    { valor: "santander", texto: "Santander" },
    { valor: "sucre", texto: "Sucre" },
    { valor: "tolima", texto: "Tolima" },
    { valor: "valledelcauca", texto: "Valle del Cauca" },
    { valor: "vaupes", texto: "Vaupés" },
    { valor: "vichada", texto: "Vichada" },
    { valor: "bogota", texto: "Bogotá D.C." }
];

var municipios = {
    "": [{ valor: "", texto: "-- Seleccionar --" }],
    "antioquia": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "medellin", texto: "Medellín" },
        { valor: "bello", texto: "Bello" },
        { valor: "itagui", texto: "Itagüí" },
        { valor: "envigado", texto: "Envigado" },
        { valor: "rionegro", texto: "Rionegro" },
        { valor: "apartado", texto: "Apartadó" }
    ],
    "atlantico": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "barranquilla", texto: "Barranquilla" },
        { valor: "soledad", texto: "Soledad" },
        { valor: "malambo", texto: "Malambo" }
    ],
    "bolivar": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "cartagena", texto: "Cartagena" },
        { valor: "magangue", texto: "Magangué" }
    ],
    "boyaca": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "tunja", texto: "Tunja" },
        { valor: "duitama", texto: "Duitama" },
        { valor: "sogamoso", texto: "Sogamoso" }
    ],
    "caldas": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "manizales", texto: "Manizales" },
        { valor: "villamaria", texto: "Villamaría" }
    ],
    "cundinamarca": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "soacha", texto: "Soacha" },
        { valor: "zipaquira", texto: "Zipaquirá" },
        { valor: "facatativa", texto: "Facatativá" },
        { valor: "chia", texto: "Chía" },
        { valor: "girardot", texto: "Girardot" }
    ],
    "huila": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "neiva", texto: "Neiva" },
        { valor: "pitalito", texto: "Pitalito" },
        { valor: "garzon", texto: "Garzón" }
    ],
    "meta": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "villavicencio", texto: "Villavicencio" },
        { valor: "acacias", texto: "Acacías" }
    ],
    "narino": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "pasto", texto: "Pasto" },
        { valor: "tumaco", texto: "Tumaco" },
        { valor: "ipiales", texto: "Ipiales" }
    ],
    "nortedesantander": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "cucuta", texto: "Cúcuta" },
        { valor: "ocana", texto: "Ocaña" }
    ],
    "quindio": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "armenia", texto: "Armenia" },
        { valor: "calarca", texto: "Calarcá" }
    ],
    "risaralda": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "pereira", texto: "Pereira" },
        { valor: "dosquebradas", texto: "Dosquebradas" },
        { valor: "santarosadecabal", texto: "Santa Rosa de Cabal" }
    ],
    "santander": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "bucaramanga", texto: "Bucaramanga" },
        { valor: "floridablanca", texto: "Floridablanca" },
        { valor: "giron", texto: "Girón" },
        { valor: "barrancabermeja", texto: "Barrancabermeja" }
    ],
    "tolima": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "ibague", texto: "Ibagué" },
        { valor: "espinal", texto: "Espinal" }
    ],
    "valledelcauca": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "cali", texto: "Cali" },
        { valor: "palmira", texto: "Palmira" },
        { valor: "buenaventura", texto: "Buenaventura" },
        { valor: "tulua", texto: "Tuluá" },
        { valor: "buga", texto: "Buga" }
    ],
    "bogota": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "bogota", texto: "Bogotá D.C." }
    ],
    "cauca": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "popayan", texto: "Popayán" },
        { valor: "santanderquilichao", texto: "Santander de Quilichao" }
    ],
    "cesar": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "valledupar", texto: "Valledupar" },
        { valor: "aguachica", texto: "Aguachica" }
    ],
    "cordoba": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "monteria", texto: "Montería" },
        { valor: "lorica", texto: "Lorica" }
    ],
    "magdalena": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "santamarta", texto: "Santa Marta" },
        { valor: "cienaga", texto: "Ciénaga" }
    ],
    "sucre": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "sincelejo", texto: "Sincelejo" },
        { valor: "corozal", texto: "Corozal" }
    ],
    "laguajira": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "riohacha", texto: "Riohacha" },
        { valor: "maicao", texto: "Maicao" }
    ],
    "caqueta": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "florencia", texto: "Florencia" }
    ],
    "casanare": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "yopal", texto: "Yopal" }
    ],
    "arauca": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "arauca", texto: "Arauca" }
    ],
    "amazonas": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "leticia", texto: "Leticia" }
    ],
    "choco": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "quibdo", texto: "Quibdó" }
    ],
    "putumayo": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "mocoa", texto: "Mocoa" }
    ],
    "guainia": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "inirida", texto: "Inírida" }
    ],
    "guaviare": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "sanjosedelguaviare", texto: "San José del Guaviare" }
    ],
    "sanandres": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "sanandres", texto: "San Andrés" },
        { valor: "providencia", texto: "Providencia" }
    ],
    "vaupes": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "mitu", texto: "Mitú" }
    ],
    "vichada": [
        { valor: "", texto: "-- Seleccionar --" },
        { valor: "puertocarreno", texto: "Puerto Carreño" }
    ]
};

// Paises
var paises = [
    { valor: "", texto: "-- Seleccionar --" },
    { valor: "colombia", texto: "Colombia" },
    { valor: "venezuela", texto: "Venezuela" },
    { valor: "ecuador", texto: "Ecuador" },
    { valor: "peru", texto: "Perú" },
    { valor: "brasil", texto: "Brasil" },
    { valor: "chile", texto: "Chile" },
    { valor: "argentina", texto: "Argentina" },
    { valor: "mexico", texto: "México" },
    { valor: "panama", texto: "Panamá" },
    { valor: "estadosunidos", texto: "Estados Unidos" },
    { valor: "espana", texto: "España" },
    { valor: "otro", texto: "Otro" }
];

// distritos militares
var distritosMilitares = [
    { valor: "", texto: "-- Seleccionar --" },
    { valor: "01", texto: "D.M. 01 - Bogotá" },
    { valor: "02", texto: "D.M. 02 - Bogotá" },
    { valor: "03", texto: "D.M. 03 - Bogotá" },
    { valor: "04", texto: "D.M. 04 - Bogotá" },
    { valor: "05", texto: "D.M. 05 - Medellín" },
    { valor: "06", texto: "D.M. 06 - Medellín" },
    { valor: "07", texto: "D.M. 07 - Cali" },
    { valor: "08", texto: "D.M. 08 - Barranquilla" },
    { valor: "09", texto: "D.M. 09 - Bucaramanga" },
    { valor: "10", texto: "D.M. 10 - Cúcuta" },
    { valor: "11", texto: "D.M. 11 - Manizales" },
    { valor: "12", texto: "D.M. 12 - Pereira" },
    { valor: "13", texto: "D.M. 13 - Ibagué" },
    { valor: "14", texto: "D.M. 14 - Neiva" },
    { valor: "15", texto: "D.M. 15 - Pasto" },
    { valor: "16", texto: "D.M. 16 - Cartagena" },
    { valor: "17", texto: "D.M. 17 - Tunja" },
    { valor: "18", texto: "D.M. 18 - Villavicencio" },
    { valor: "19", texto: "D.M. 19 - Popayán" },
    { valor: "20", texto: "D.M. 20 - Armenia" },
    { valor: "21", texto: "D.M. 21 - Santa Marta" },
    { valor: "22", texto: "D.M. 22 - Valledupar" },
    { valor: "23", texto: "D.M. 23 - Montería" },
    { valor: "24", texto: "D.M. 24 - Sincelejo" },
    { valor: "25", texto: "D.M. 25 - Florencia" },
    { valor: "26", texto: "D.M. 26 - Riohacha" },
    { valor: "27", texto: "D.M. 27 - Quibdó" }
];

// Modalidades academicas
var modalidadesAcademicas = [
    { valor: "", texto: "-- Seleccionar --" },
    { valor: "TC", texto: "TC - Técnica" },
    { valor: "TL", texto: "TL - Tecnológica" },
    { valor: "TE", texto: "TE - Tecnológica Especializada" },
    { valor: "UN", texto: "UN - Universitaria" },
    { valor: "ES", texto: "ES - Especialización" },
    { valor: "MG", texto: "MG - Maestría o Magíster" },
    { valor: "DOC", texto: "DOC - Doctorado o PHD" }
];

// Meses del año
var meses = [
    { valor: "", texto: "-- Mes --" },
    { valor: "01", texto: "Enero" },
    { valor: "02", texto: "Febrero" },
    { valor: "03", texto: "Marzo" },
    { valor: "04", texto: "Abril" },
    { valor: "05", texto: "Mayo" },
    { valor: "06", texto: "Junio" },
    { valor: "07", texto: "Julio" },
    { valor: "08", texto: "Agosto" },
    { valor: "09", texto: "Septiembre" },
    { valor: "10", texto: "Octubre" },
    { valor: "11", texto: "Noviembre" },
    { valor: "12", texto: "Diciembre" }
];

// Tipos de ocupacion para tiempo de experiencia
var tiposOcupacion = [
    { valor: "", texto: "-- Seleccionar --" },
    { valor: "servidor_publico", texto: "Servidor Público" },
    { valor: "empleado_privado", texto: "Empleado del Sector Privado" },
    { valor: "independiente", texto: "Trabajador Independiente" }
];

// ============================================
// Almacenamiento en memoria (arreglos de hojas de vida)
// ============================================

// La hoja de vida actual que esta completando el usuario
var hojaVidaActual = {
    datosPersonales: null,
    formacionAcademica: null,
    experienciaLaboral: null,
    tiempoExperiencia: null,
    certificacion: null,
    estado: "diligenciada",
    fechaCreacion: ""
};

// lista de hojas de vida registradas (datos del admin)
var hojasDeVida = [
    {
        id: 1,
        datosPersonales: {
            primerApellido: "García",
            segundoApellido: "López",
            nombres: "Carlos Andrés",
            tipoDocumento: "CC",
            numeroDocumento: "1030456789",
            sexo: "M",
            nacionalidad: "COL",
            pais: "colombia",
            fechaNacDia: "15",
            fechaNacMes: "03",
            fechaNacAnio: "1990",
            paisNac: "colombia",
            deptoNac: "cundinamarca",
            municipioNac: "bogota",
            direccionCorrespondencia: "Calle 45 #12-34",
            paisCorr: "colombia",
            deptoCorr: "cundinamarca",
            municipioCorr: "bogota",
            telefono: "3101234567",
            email: "carlos.garcia@email.com"
        },
        formacionAcademica: {
            gradoAprobado: "11",
            tituloBasica: "Bachiller Académico",
            fechaGradoMes: "12",
            fechaGradoAnio: "2007",
            estudiosSuperiores: [
                { modalidad: "UN", semestres: "10", graduado: "si", nombreEstudio: "Ingeniería de Sistemas", mesTerminacion: "06", anioTerminacion: "2013", tarjetaProfesional: "12345" }
            ],
            idiomas: [
                { idioma: "Inglés", habla: "B", lee: "MB", escribe: "B" }
            ]
        },
        experienciaLaboral: [
            { empresa: "Tech Solutions S.A.S", tipoEmpresa: "privada", paisEmp: "colombia", deptoEmp: "cundinamarca", municipioEmp: "bogota", correoEntidad: "info@techsolutions.com", telefono: "6011234567", fechaIngresoDia: "01", fechaIngresoMes: "07", fechaIngresoAnio: "2013", fechaRetiroDia: "15", fechaRetiroMes: "12", fechaRetiroAnio: "2018", cargo: "Desarrollador Senior", dependencia: "Tecnología", direccion: "Av. 68 #23-45" }
        ],
        tiempoExperiencia: [
            { ocupacion: "empleado_privado", anios: "5", mesesTot: "5" }
        ],
        totalAnios: "5",
        totalMeses: "5",
        certificacion: { aceptaJuramento: true, observaciones: "" },
        estado: "aceptada",
        fechaCreacion: "2026-03-15"
    },
    {
        id: 2,
        datosPersonales: {
            primerApellido: "Martínez",
            segundoApellido: "Rojas",
            nombres: "Ana María",
            tipoDocumento: "CC",
            numeroDocumento: "1020345678",
            sexo: "F",
            nacionalidad: "COL",
            pais: "colombia",
            fechaNacDia: "22",
            fechaNacMes: "08",
            fechaNacAnio: "1995",
            paisNac: "colombia",
            deptoNac: "antioquia",
            municipioNac: "medellin",
            direccionCorrespondencia: "Carrera 70 #45-12",
            paisCorr: "colombia",
            deptoCorr: "antioquia",
            municipioCorr: "medellin",
            telefono: "3209876543",
            email: "ana.martinez@email.com"
        },
        formacionAcademica: {
            gradoAprobado: "11",
            tituloBasica: "Bachiller Técnico",
            fechaGradoMes: "11",
            fechaGradoAnio: "2012",
            estudiosSuperiores: [
                { modalidad: "TL", semestres: "6", graduado: "si", nombreEstudio: "Tecnología en Contabilidad", mesTerminacion: "12", anioTerminacion: "2015", tarjetaProfesional: "" },
                { modalidad: "UN", semestres: "10", graduado: "no", nombreEstudio: "Contaduría Pública", mesTerminacion: "", anioTerminacion: "", tarjetaProfesional: "" }
            ],
            idiomas: []
        },
        experienciaLaboral: [
            { empresa: "Municipio de Medellín", tipoEmpresa: "publica", paisEmp: "colombia", deptoEmp: "antioquia", municipioEmp: "medellin", correoEntidad: "contacto@medellin.gov.co", telefono: "6044441234", fechaIngresoDia: "10", fechaIngresoMes: "01", fechaIngresoAnio: "2016", fechaRetiroDia: "", fechaRetiroMes: "", fechaRetiroAnio: "", cargo: "Auxiliar Contable", dependencia: "Hacienda", direccion: "Calle 44 #52-165" }
        ],
        tiempoExperiencia: [
            { ocupacion: "servidor_publico", anios: "10", mesesTot: "3" }
        ],
        totalAnios: "10",
        totalMeses: "3",
        certificacion: { aceptaJuramento: true, observaciones: "" },
        estado: "diligenciada",
        fechaCreacion: "2026-03-28"
    },
    {
        id: 3,
        datosPersonales: {
            primerApellido: "Rodríguez",
            segundoApellido: "Pérez",
            nombres: "Luis Fernando",
            tipoDocumento: "CC",
            numeroDocumento: "80123456",
            sexo: "M",
            nacionalidad: "COL",
            pais: "colombia",
            fechaNacDia: "05",
            fechaNacMes: "11",
            fechaNacAnio: "1985",
            paisNac: "colombia",
            deptoNac: "valledelcauca",
            municipioNac: "cali",
            direccionCorrespondencia: "Av. 3N #45-20",
            paisCorr: "colombia",
            deptoCorr: "valledelcauca",
            municipioCorr: "cali",
            telefono: "3157894561",
            email: "luis.rodriguez@email.com"
        },
        formacionAcademica: {
            gradoAprobado: "11",
            tituloBasica: "Bachiller Académico",
            fechaGradoMes: "12",
            fechaGradoAnio: "2002",
            estudiosSuperiores: [
                { modalidad: "UN", semestres: "10", graduado: "si", nombreEstudio: "Derecho", mesTerminacion: "06", anioTerminacion: "2008", tarjetaProfesional: "67890" },
                { modalidad: "ES", semestres: "2", graduado: "si", nombreEstudio: "Especialización en Derecho Laboral", mesTerminacion: "12", anioTerminacion: "2010", tarjetaProfesional: "" }
            ],
            idiomas: [
                { idioma: "Inglés", habla: "R", lee: "B", escribe: "R" },
                { idioma: "Francés", habla: "R", lee: "R", escribe: "R" }
            ]
        },
        experienciaLaboral: [
            { empresa: "Juzgado 12 Civil", tipoEmpresa: "publica", paisEmp: "colombia", deptoEmp: "valledelcauca", municipioEmp: "cali", correoEntidad: "juzgado12@ramajudicial.gov.co", telefono: "6028901234", fechaIngresoDia: "01", fechaIngresoMes: "02", fechaIngresoAnio: "2009", fechaRetiroDia: "30", fechaRetiroMes: "06", fechaRetiroAnio: "2015", cargo: "Abogado Sustanciador", dependencia: "Civil", direccion: "Cra 10 #12-34" },
            { empresa: "Firma Jurídica Pérez & Asociados", tipoEmpresa: "privada", paisEmp: "colombia", deptoEmp: "valledelcauca", municipioEmp: "cali", correoEntidad: "contacto@perezasociados.com", telefono: "6025678901", fechaIngresoDia: "01", fechaIngresoMes: "08", fechaIngresoAnio: "2015", fechaRetiroDia: "", fechaRetiroMes: "", fechaRetiroAnio: "", cargo: "Socio Director", dependencia: "Dirección General", direccion: "Av. 6N #23-56" }
        ],
        tiempoExperiencia: [
            { ocupacion: "servidor_publico", anios: "6", mesesTot: "5" },
            { ocupacion: "empleado_privado", anios: "10", mesesTot: "8" }
        ],
        totalAnios: "17",
        totalMeses: "1",
        certificacion: { aceptaJuramento: true, observaciones: "" },
        estado: "rechazada",
        fechaCreacion: "2026-04-01"
    }
];

// Proximo id para nuevas hojas de vida
var proximoIdHV = 4;

// Usuario actual logueado
var usuarioActual = null;
var rolActual = null;

// Funcion utilitaria para cargar opciones en un select
function cargarSelect(idSelect, opciones) {
    var select = document.getElementById(idSelect);
    if (!select) return;
    select.innerHTML = "";
    for (var i = 0; i < opciones.length; i++) {
        var option = document.createElement("option");
        option.value = opciones[i].valor;
        option.textContent = opciones[i].texto;
        select.appendChild(option);
    }
}

// Cargar municipios segun departamento seleccionado
function cargarMunicipios(idDepto, idMunicipio) {
    var depto = document.getElementById(idDepto).value;
    var listaMunicipios = municipios[depto] || [{ valor: "", texto: "-- Seleccionar --" }];
    cargarSelect(idMunicipio, listaMunicipios);
}

// Funcion para obtener texto de opcion seleccionada
function textoSeleccionado(idSelect) {
    var select = document.getElementById(idSelect);
    if (!select || select.selectedIndex < 0) return "";
    return select.options[select.selectedIndex].text;
}
