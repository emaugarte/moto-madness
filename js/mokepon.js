const sectionSeleccionarAtaque = document.getElementById("seleccionar-ataque");
const sectionReiniciar = document.getElementById("reiniciar");

const botonMotoJugador = document.getElementById("boton-moto");
botonMotoJugador.addEventListener("click", seleccionarMotoJugador);

const spanMotoJugador = document.getElementById("moto-jugador");
const sectionSeleccionarMoto = document.getElementById("seleccionar-moto");
const spanMotoEnemigo = document.getElementById("moto-enemigo");
const spanVidasJugador = document.getElementById("vidas-jugador");
const spanVidasEnemigo = document.getElementById("vidas-enemigo");
const sectionMensajes = document.getElementById("resultado");
const ataquesDelJugador = document.getElementById("ataques-del-jugador");
const ataquesDelEnemigo = document.getElementById("ataques-del-enemigo");
const contenedorTarjetas = document.getElementById("contenedorTarjetas");
const contenedorAtaques = document.getElementById("contenedorAtaques");

let inputKawasaki;
let inputYamaha;
let inputDucati;
let motosJugador;
let ataquesMotos;

let motos = [];
let ataqueJugador;
let ataqueEnemigo;
let botonReiniciar;
let botonTurbo;
let botonAspirado;
let botonNitro;
let opcionDeMotos;
let vidasJugador = 3;
let vidasEnemigo = 3;

class MotoMadness {
  constructor(nombre, foto, vida) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
  }
}

let kawasaki = new MotoMadness("Kawasaki", "/assets/kawasaki.png", 5);

let yamaha = new MotoMadness("Yamaha", "/assets/yamaha.png", 5);

let ducati = new MotoMadness("Ducati", "/assets/ducati.png", 5);

kawasaki.ataques.push(
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "🌠", id: "boton-nitro" }
);

yamaha.ataques.push(
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "🌠", id: "boton-nitro" }
);

ducati.ataques.push(
  { nombre: "🌠", id: "boton-nitro" },
  { nombre: "🌠", id: "boton-nitro" },
  { nombre: "🌠", id: "boton-nitro" },
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "⚙", id: "boton-turbo" }
);

motos.push(kawasaki);
motos.push(yamaha);
motos.push(ducati);

function iniciarJuego() {
  sectionSeleccionarAtaque.style.display = "none";

  motos.forEach((motos) => {
    opcionDeMotos = `
    <div class="moto moto-${motos.nombre}">
          <label class="tarjeta-de-mokepon" for=${motos.nombre}>
          ${motos.nombre}

            <img src=${motos.foto} alt=${motos.nombre} />
          </label>
          <input type="radio" name="moto" id=${motos.nombre} />
        </div>
    `;
    contenedorTarjetas.innerHTML += opcionDeMotos;
  });

  inputKawasaki = document.getElementById("Kawasaki");
  inputYamaha = document.getElementById("Yamaha");
  inputDucati = document.getElementById("Ducati");

  sectionReiniciar.style.display = "none";
}

function seleccionarMotoJugador() {
  if (inputKawasaki.checked) {
    spanMotoJugador.innerHTML = inputKawasaki.id;
    motosJugador = inputKawasaki.id;
  } else if (inputYamaha.checked) {
    spanMotoJugador.innerHTML = inputYamaha.id;
    motosJugador = inputYamaha.id;
  } else if (inputDucati.checked) {
    spanMotoJugador.innerHTML = inputDucati.id;
    motosJugador = inputDucati.id;
  } else {
    alert("ELEGI LA MOTO PA");
    return;
  }

  extraerAtaques(motosJugador);

  sectionSeleccionarMoto.style.display = "none";

  sectionSeleccionarAtaque.style.display = "flex";

  seleccionarMotoEnemigo();
}

function extraerAtaques(motosJugador) {
  let ataques;
  for (let i = 0; i < motos.length; i++) {
    if (motosJugador == motos[i].nombre) {
      ataques = motos[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    ataquesMotos = `
      <button id="${ataque.id}" class="boton-de-class">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesMotos;
  });

  botonReiniciar = document.getElementById("boton-reiniciar");
  botonTurbo = document.getElementById("boton-turbo");
  botonAspirado = document.getElementById("boton-aspirado");
  botonNitro = document.getElementById("boton-nitro");

  botonTurbo.addEventListener("click", ataqueTurbo);
  botonReiniciar.addEventListener("click", reiniciarJuego);

  botonNitro.addEventListener("click", ataqueNitro);
  botonAspirado.addEventListener("click", ataqueAspirado);
}

function seleccionarMotoEnemigo() {
  let motoAleatorio = aleatorio(0, motos.length - 1);

  spanMotoEnemigo.innerHTML = motos[motoAleatorio].nombre;
}

function ataqueTurbo() {
  ataqueJugador = "TURBO";
  ataqueAleatorioEnemigo();
}

function ataqueAspirado() {
  ataqueJugador = "ASPIRADO";
  ataqueAleatorioEnemigo();
}

function ataqueNitro() {
  ataqueJugador = "NITRO";
  ataqueAleatorioEnemigo();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(1, 3);

  if (ataqueAleatorio == 1) {
    ataqueEnemigo = "NITRO";
  } else if (ataqueAleatorio == 2) {
    ataqueEnemigo = "ASPIRADO";
  } else {
    ataqueEnemigo = "NITRO";
  }

  combate();
}

function combate() {
  if (ataqueEnemigo == ataqueJugador) {
    crearMensaje(" EMPATE 😑");
  } else if (ataqueJugador == "TURBO" && ataqueEnemigo == "NITRO") {
    crearMensaje(" GANASTE!🏆");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "ASPIRADO" && ataqueEnemigo == "TURBO") {
    crearMensaje(" GANASTE!🏆");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else if (ataqueJugador == "NITRO" && ataqueEnemigo == "ASPIRADO") {
    crearMensaje(" GANASTE!🏆");
    vidasEnemigo--;
    spanVidasEnemigo.innerHTML = vidasEnemigo;
  } else {
    crearMensaje(" PERDISTE 😞");
    vidasJugador--;
    spanVidasJugador.innerHTML = vidasJugador;
  }

  revisarVidas();
}

function revisarVidas() {
  if (vidasEnemigo == 0) {
    crearMensajeFinal("CONGRATS PA GANASTE UwU");
  } else if (vidasJugador == 0) {
    crearMensajeFinal("SORRY BRO PERDISTE DE PIOLA :(");
  }
}

function crearMensaje(resultado) {
  let notificacion = document.createElement("p");
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = ataqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = ataqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  botonTurbo.disabled = true;

  botonAspirado.disabled = true;

  botonNitro.disabled = true;

  sectionReiniciar.style.display = "flex";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

window.addEventListener("load", iniciarJuego);
