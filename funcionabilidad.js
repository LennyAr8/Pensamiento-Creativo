const totalCells = 10;
const totalPlayers = 7;
let players = [];
let currentPlayerIndex = 0;
let positions = [0, 0, 0, 0, 0, 0, 0];
let diceResult = 0;
let timer;

// --- Presentación ---
function showSetup() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.querySelector('header').style.opacity = '1';
    document.getElementById('setup-screen').style.display = 'block';
}

const rawBank = [
    // Conocimientos Técnicos (40)
    { c: "Sistemas", q: "¿Cuál es la función principal de un Sistema Operativo?", o: ["Diseñar hardware", "Gestionar recursos y software", "Compilar código", "Crear bases de datos"], a: 1 },
    { c: "Redes", q: "¿Qué significa el acrónimo IP?", o: ["Internet Protocol", "Internal Process", "Information Path", "Intranet Point"], a: 0 },
    { c: "Software", q: "¿Qué es un algoritmo?", o: ["Un lenguaje de programación", "Pasos ordenados para resolver un problema", "Un error de sistema", "Un tipo de memoria"], a: 1 },
    { c: "Bases de Datos", q: "¿Qué comando SQL se usa para recuperar datos?", o: ["UPDATE", "INSERT", "SELECT", "FETCH"], a: 2 },
    { c: "Seguridad", q: "¿Qué es el Phishing?", o: ["Un virus residente", "Suplantación de identidad", "Ataque de fuerza bruta", "Limpieza de disco"], a: 1 },
    { c: "Hardware", q: "¿Qué componente realiza cálculos aritméticos?", o: ["RAM", "ALU (Unidad Aritmético Lógica)", "SSD", "BIOS"], a: 1 },
    { c: "Redes", q: "¿Qué protocolo se usa para enviar correos?", o: ["HTTP", "SMTP", "FTP", "POP3"], a: 1 },
    { c: "Sistemas", q: "Un sistema de 64 bits puede direccionar más...", o: ["Velocidad de reloj", "Memoria RAM", "Energía", "Núcleos"], a: 1 },
    { c: "Programación", q: "¿Cuál es una estructura de control iterativa?", o: ["IF-ELSE", "SWITCH", "WHILE", "DEFINE"], a: 2 },
    { c: "IAS", q: "¿Qué es la 'Nube' en computación?", o: ["Un servidor meteorológico", "Servicios a través de Internet", "Un disco duro local", "Un tipo de monitor"], a: 1 },
    { c: "Sistemas", q: "¿Qué significa BIOS?", o: ["Basic Input Output System", "Binary Input Output System", "Base Internal Operating Software", "Basic Intel Operating System"], a: 0 },
    { c: "Programación", q: "Variable que solo puede tener valores Verdadero o Falso:", o: ["Integer", "String", "Boolean", "Float"], a: 2 },
    { c: "Bases de Datos", q: "¿Qué es una llave primaria?", o: ["Una contraseña", "Identificador único de un registro", "Un índice de texto", "Una carpeta oculta"], a: 1 },
    { c: "Redes", q: "Dispositivo que conecta redes y elige la mejor ruta:", o: ["Switch", "Hub", "Router", "Bridge"], a: 2 },
    { c: "Software", q: "¿Qué es el código abierto?", o: ["Software gratuito", "Código accesible y modificable", "Software sin licencia", "Software de Microsoft"], a: 1 },
    { c: "IAS", q: "¿Qué es el 'Backend'?", o: ["La parte visual", "La lógica del lado del servidor", "El teclado", "La base del monitor"], a: 1 },
    { c: "Sistemas", q: "¿Qué comando en CMD muestra la configuración IP?", o: ["ipconfig", "ifconfig", "netstat", "ping"], a: 0 },
    { c: "Software", q: "¿Qué es una 'Bug'?", o: ["Un insecto", "Un error o fallo en el software", "Una actualización", "Un tipo de cable"], a: 1 },
    { c: "Programación", q: "¿Para qué sirve el operador modulo (%)?", o: ["Dividir", "Obtener el residuo", "Multiplicar", "Porcentajes"], a: 1 },
    { c: "Redes", q: "¿Cuál es la velocidad de un Gigabit Ethernet?", o: ["100 Mbps", "1000 Mbps", "10 Gbps", "10 Mbps"], a: 1 },
    { c: "Hardware", q: "¿Qué significa SSD?", o: ["Super Smart Disk", "Solid State Drive", "System Storage Device", "Static Solid Drive"], a: 1 },
    { c: "Software", q: "¿Cuál no es un lenguaje de programación?", o: ["Java", "Python", "HTML", "C++"], a: 2 },
    { c: "Seguridad", q: "¿Qué es un Firewall?", o: ["Extintor", "Sistema de defensa de red", "Cable blindado", "Antivirus"], a: 1 },
    { c: "Bases de Datos", q: "¿Qué significa ACID en BD?", o: ["Propiedades de transacciones", "Un tipo de consulta", "Un virus de datos", "Un lenguaje nuevo"], a: 0 },
    { c: "IAS", q: "¿Qué es la Inteligencia Artificial?", o: ["Robots físicos", "Simulación de procesos inteligentes", "Pantallas táctiles", "Internet rápido"], a: 1 },
    { c: "Sistemas", q: "¿Cuál es la función de la Memoria Caché?", o: ["Guardar archivos", "Acelerar acceso a datos frecuentes", "Eliminar virus", "Instalar programas"], a: 1 },
    { c: "Redes", q: "¿Qué es una VPN?", o: ["Red Virtual Privada", "Red Visual Programada", "Ruta de Proceso Veloz", "Red de Video Personal"], a: 0 },
    { c: "Programación", q: "¿Qué es la herencia en POO?", o: ["Dinero", "Transferencia de atributos entre clases", "Copiar archivos", "Borrar carpetas"], a: 1 },
    { c: "Software", q: "Ciclo de vida: ¿Qué sigue después del análisis?", o: ["Mantenimiento", "Diseño", "Pruebas", "Despliegue"], a: 1 },
    { c: "Hardware", q: "¿Qué es el Overclocking?", o: ["Limpiar PC", "Aumentar velocidad del reloj CPU", "Instalar Windows", "Cambiar mouse"], a: 1 },
    { c: "IAS", q: "¿Qué significa IoT?", o: ["Internet of Tasks", "Internet of Things", "Internal of Time", "Internet of Tools"], a: 1 },
    { c: "Redes", q: "¿Qué puerto usa HTTPS?", o: ["80", "21", "443", "22"], a: 2 },
    { c: "Sistemas", q: "¿Qué es el Kernel?", o: ["Un programa de diseño", "El núcleo del sistema operativo", "Un tipo de virus", "Un ventilador"], a: 1 },
    { c: "Software", q: "¿Qué es el Framework?", o: ["Un marco de fotos", "Conjunto estandarizado de conceptos", "Una base de datos", "Un lenguaje"], a: 1 },
    { c: "Bases de Datos", q: "Relación: Un cliente tiene muchos pedidos.", o: ["1 a 1", "1 a muchos", "Muchos a muchos", "Ninguna"], a: 1 },
    { c: "Programación", q: "¿Qué es la indentación?", o: ["Negritas", "Espacios al inicio de líneas", "Borrar código", "Comentar"], a: 1 },
    { c: "Seguridad", q: "¿Qué es un Malware?", o: ["Software de oficina", "Software malicioso", "Hardware defectuoso", "Un antivirus"], a: 1 },
    { c: "IAS", q: "¿Qué es Big Data?", o: ["Disco duro de 10TB", "Conjuntos de datos masivos", "Internet gratis", "Una empresa"], a: 1 },
    { c: "Redes", q: "¿Qué hace el comando PING?", o: ["Apaga el PC", "Comprueba conectividad", "Baja latencia", "Formatea"], a: 1 },
    { c: "Hardware", q: "¿Qué es un Periférico?", o: ["El CPU", "Dispositivos externos", "La placa base", "La fuente"], a: 1 },

    // Pensamiento y Lógica (40)
    { c: "Lógica", q: "Si P es verdadero y Q es falso, ¿qué es P O Q?", o: ["Verdadero", "Falso", "Indeterminado", "Ninguno"], a: 0 },
    { c: "Observación", q: "En una carrera, adelantas al segundo. ¿En qué posición estás?", o: ["Primero", "Segundo", "Tercero", "Último"], a: 1 },
    { c: "Análisis", q: "¿Cuál es el resultado de 10 + 10 x 0?", o: ["0", "20", "10", "1"], a: 2 },
    { c: "Relación", q: "Teclado es a Escribir como Monitor es a...", o: ["Escuchar", "Visualizar", "Imprimir", "Escanear"], a: 1 },
    { c: "Análisis", q: "Padre de Ana tiene 5 hijas: Lala, Lele, Lili, Lolo y...", o: ["Lulu", "Laly", "Ana", "Lili"], a: 2 },
    { c: "Clasificación", q: "Elemento que NO pertenece: Linux, Windows, MacOS, Office.", o: ["Linux", "Office", "Windows", "MacOS"], a: 1 },
    { c: "Lógica", q: "Un tren eléctrico va al Norte, viento al Sur. ¿Hacia dónde va el humo?", o: ["Sur", "Norte", "A ningún lado", "Este"], a: 2 },
    { c: "Relación", q: "Bit es a Byte como Centímetro es a...", o: ["Metro", "Milímetro", "Litro", "Kilo"], a: 0 },
    { c: "Análisis", q: "3 gatos cazan 3 ratones en 3 min, ¿cuánto tarda 1 gato en 1 ratón?", o: ["1 min", "3 min", "9 min", "0 min"], a: 1 },
    { c: "Observación", q: "¿Cuántos meses tienen 28 días?", o: ["1", "12", "6", "2"], a: 1 },
    { c: "Lógica", q: "Si el ayer de pasado mañana es lunes, ¿qué día es hoy?", o: ["Sábado", "Domingo", "Lunes", "Viernes"], a: 1 },
    { c: "Análisis", q: "Tengo ciudades pero no casas. ¿Qué soy?", o: ["La Luna", "Un mapa", "El desierto", "Un sueño"], a: 1 },
    { c: "Clasificación", q: "¿Cuál es el intruso? Java, Python, C++, HTML.", o: ["Java", "HTML", "C++", "Python"], a: 1 },
    { c: "Lógica", q: "Si todos los hombres son mortales y Juan es hombre...", o: ["Juan es mortal", "Juan es viejo", "Juan es inmortal", "Juan es IAS"], a: 0 },
    { c: "Análisis", q: "¿Qué pesa más? 1kg de hierro o 1kg de algodón.", o: ["Hierro", "Algodón", "Pesan igual", "Clima"], a: 2 },
    { c: "Relación", q: "Malla es a Red como Pantalla es a...", o: ["Monitor", "Vidrio", "Imagen", "Luz"], a: 0 },
    { c: "Observación", q: "¿Qué se rompe al decir su nombre?", o: ["Hielo", "Silencio", "Promesa", "Cristal"], a: 1 },
    { c: "Análisis", q: "¿Cuál es la mitad de 2 más 2?", o: ["2", "3", "1", "4"], a: 1 },
    { c: "Lógica", q: "¿Qué va hacia arriba y abajo pero no se mueve?", o: ["Ascensor", "Escalera", "Nubes", "Lluvia"], a: 1 },
    { c: "Observación", q: "El hijo de mi padre es mi...", o: ["Tío", "Hermano", "Primo", "Sobrino"], a: 1 },
    { c: "Clasificación", q: "Día intruso: Lunes, Martes, Enero, Miércoles.", o: ["Lunes", "Enero", "Martes", "Miércoles"], a: 1 },
    { c: "Relación", q: "Software es a Intangible como Hardware es a...", o: ["Virtual", "Tangible", "Blando", "Caro"], a: 1 },
    { c: "Lógica", q: "Si P implica Q y P es cierto, entonces...", o: ["Q es falso", "Q es cierto", "Q es nulo", "Nada"], a: 1 },
    { c: "Análisis", q: "7 personas se saludan una vez, ¿cuántos saludos hay?", o: ["7", "14", "21", "49"], a: 2 },
    { c: "Observación", q: "¿Qué tiene llaves pero no abre cerraduras?", o: ["Cofre", "Teclado", "Libro", "Puerta"], a: 1 },
    { c: "Relación", q: "A es a B como 1 es a...", o: ["2", "C", "A", "Z"], a: 0 },
    { c: "Análisis", q: "Patrón: 2, 4, 8, 16...", o: ["20", "24", "32", "64"], a: 2 },
    { c: "Lógica", q: "Pato pone un huevo en la frontera. ¿De quién es?", o: ["País A", "País B", "Del pato", "Pato no pone huevo"], a: 3 },
    { c: "Observación", q: "¿Qué palabra está mal escrita en el diccionario?", o: ["Malescrita", "Diccionario", "Incorrectamente", "Ninguna"], a: 2 },
    { c: "Análisis", q: "¿Cuántos segundos tiene un minuto?", o: ["60", "100", "3600", "120"], a: 0 },
    { c: "Relación", q: "Ratón es a Computadora como Volante es a...", o: ["Avión", "Coche", "Barco", "Bici"], a: 1 },
    { c: "Clasificación", q: "Sabor intruso: Dulce, Salado, Amargo, Rojo.", o: ["Dulce", "Rojo", "Amargo", "Salado"], a: 1 },
    { c: "Lógica", q: "¿Qué sigue? Enero, Marzo, Mayo...", o: ["Junio", "Julio", "Agosto", "Septiembre"], a: 1 },
    { c: "Análisis", q: "Si multiplicas todos los números de un teclado...", o: ["Mucho", "0", "1000", "Infinito"], a: 1 },
    { c: "Observación", q: "Antes de descubrir el Everest, ¿cuál era el monte más alto?", o: ["K2", "Everest", "Kilimanjaro", "Mont Blanc"], a: 1 },
    { c: "Relación", q: "Piloto es a Avión como Capitán es a...", o: ["Tren", "Barco", "Coche", "Bus"], a: 1 },
    { c: "Lógica", q: "¿Qué tiene 4 ruedas y vuela?", o: ["Avión", "Camión de basura", "Coche", "Helicóptero"], a: 1 },
    { c: "Análisis", q: "Si hoy es martes, ¿qué día es ayer de pasado mañana?", o: ["Lunes", "Martes", "Miércoles", "Jueves"], a: 2 },
    { c: "Clasificación", q: "Color intruso: Amarillo, Azul, Rojo, Negro.", o: ["Rojo", "Negro", "Azul", "Amarillo"], a: 1 },
    { c: "IAS", q: "¿Qué es el Pensamiento Sistémico?", o: ["Pensar rápido", "Ver el todo y sus relaciones", "Reparar PCs", "Programar"], a: 1 }
];

let activeDeck = [...rawBank];

function startGame() {
    players = [];
    for (let i = 1; i <= 7; i++) {
        const input = document.getElementById('name' + i);
        const val = input ? input.value.trim() : "";
        players.push(val === "" ? "Integrante " + i : val);
    }
    document.getElementById('setup-screen').style.display = 'none';
    document.querySelector('header').style.display = 'block'; // Asegura que el header sea visible
    document.getElementById('game-screen').style.display = 'flex';
    initBoard();
    updateTurn();
}

function initBoard() {
    const b = document.getElementById('board');
    b.innerHTML = "";
    for (let p = 0; p < totalPlayers; p++) {
        const lane = document.createElement('div');
        lane.className = 'lane';
        lane.innerHTML = `<div class="player-label">${players[p]}</div>`;
        for (let c = 0; c <= totalCells; c++) {
            const cell = document.createElement('div');
            cell.className = 'cell' + (c === totalCells ? ' goal' : '');
            cell.id = `j${p}-c${c}`;
            cell.innerText = c === totalCells ? 'FIN' : c;
            lane.appendChild(cell);
        }
        b.appendChild(lane);
    }
    updateTokens();
}

function updateTokens() {
    document.querySelectorAll('.token').forEach(t => t.remove());
    positions.forEach((pos, i) => {
        const cell = document.getElementById(`j${i}-c${pos}`);
        if (cell) {
            const token = document.createElement('div');
            token.className = `token p${i + 1}`;
            cell.appendChild(token);
        }
    });
}

function updateTurn() {
    document.getElementById('current-name').innerText = players[currentPlayerIndex];
    document.getElementById('turn-indicator').className = `p${currentPlayerIndex + 1}`;
    document.getElementById('deck-info').innerText = `Preguntas en mazo: ${activeDeck.length}`;
}

function startTurn() {
    document.getElementById('roll-btn').disabled = true;
    diceResult = Math.floor(Math.random() * 3) + 1;
    document.getElementById('dice-val').innerText = "🎲" + diceResult;
    setTimeout(showQuestion, 600);
}

function showQuestion() {
    if (activeDeck.length === 0) {
        alert("¡Se agotaron las preguntas! Reiniciando mazo...");
        activeDeck = [...rawBank];
    }
    const rIdx = Math.floor(Math.random() * activeDeck.length);
    const q = activeDeck.splice(rIdx, 1)[0];

    document.getElementById('q-category').innerText = q.c;
    document.getElementById('q-text').innerText = q.q;
    const container = document.getElementById('options-container');
    container.innerHTML = "";

    q.o.forEach((opt, idx) => {
        const b = document.createElement('button');
        b.className = 'opt-btn';
        b.innerText = opt;
        b.onclick = () => check(idx, q.a);
        container.appendChild(b);
    });

    document.getElementById('overlay').style.display = 'block';
    document.getElementById('q-modal').style.display = 'block';

    let t = 100;
    document.getElementById('timer-fill').style.width = "100%";
    clearInterval(timer);
    timer = setInterval(() => {
        t -= 1;
        document.getElementById('timer-fill').style.width = t + "%";
        if (t <= 0) { clearInterval(timer); check(-1, -2); }
    }, 120);
}

function check(sel, cor) {
    clearInterval(timer);
    document.getElementById('overlay').style.display = 'none';
    document.getElementById('q-modal').style.display = 'none';

    if (sel === cor) {
        positions[currentPlayerIndex] += diceResult;
        if (positions[currentPlayerIndex] >= totalCells) {
            positions[currentPlayerIndex] = totalCells;
            updateTokens();
            alert(`🏆 ¡VICTORIA PARA ${players[currentPlayerIndex]}!`);
            location.reload();
            return;
        }
    } else {
        alert("❌ ERROR: Retrocedes 2 casillas.");
        positions[currentPlayerIndex] = Math.max(0, positions[currentPlayerIndex] - 2);
    }

    currentPlayerIndex = (currentPlayerIndex + 1) % totalPlayers;
    document.getElementById('roll-btn').disabled = false;
    updateTurn();
    updateTokens();
}