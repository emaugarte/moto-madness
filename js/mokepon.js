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
const botonReiniciar = document.getElementById("boton-reiniciar");

const sectionVerMapa = document.getElementById("ver-mapa");
const mapa = document.getElementById("mapa");

let inputKawasaki;
let inputYamaha;
let inputDucati;
let motosJugador;
let motoJugadorObjeto;
let ataquesMotos;
let ataquesMotoEnemigo;

let motos = [];
let ataqueJugador = [];
let ataqueEnemigo = [];
let botonTurbo;
let botonAspirado;
let botonNitro;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let opcionDeMotos;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let vidasJugador = 3;
let vidasEnemigo = 3;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaBackground = new Image();
mapaBackground.src = "./assets/mapmotomadness.png";
let alturaQueBuscamos;
let anchoDelMapa = window.innerWidth - 20;
const anchoMaximoDelMapa = 650;

if (anchoDelMapa > anchoMaximoDelMapa) {
  anchoDelMapa = anchoMaximoDelMapa - 20;
}

alturaQueBuscamos = (anchoDelMapa * 600) / 800;

mapa.width = anchoDelMapa;
mapa.height = alturaQueBuscamos;

class MotoMadness {
  constructor(nombre, foto, vida, fotoMapa) {
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 80;
    this.alto = 80;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMoto() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let kawasaki = new MotoMadness(
  "Kawasaki",
  "/assets/kawasaki.png",
  5,
  "/assets/kawasaki.png",
  10,
  190
);

let yamaha = new MotoMadness(
  "Yamaha",
  "/assets/yamaha.png",
  5,
  "/assets/yamaha.png",
  10,
  10
);

let ducati = new MotoMadness(
  "Ducati",
  "/assets/ducati.png",
  5,
  "/assets/ducati.png",
  200,
  10
);

let kawasakiEnemigo = new MotoMadness(
  "Kawasaki",
  "/assets/kawasaki.png",
  5,
  "/assets/kawasaki.png"
);

let yamahaEnemigo = new MotoMadness(
  "Yamaha",
  "/assets/yamaha.png",
  5,
  "/assets/yamaha.png"
);

let ducatiEnemigo = new MotoMadness(
  "Ducati",
  "/assets/ducati.png",
  5,
  "/assets/ducati.png"
);

kawasaki.ataques.push(
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "⚙", id: "boton-turbo" },
  { nombre: "💨", id: "boton-aspirado" },
  { nombre: "🌠", id: "boton-nitro" }
);

kawasakiEnemigo.ataques.push(
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

yamahaEnemigo.ataques.push(
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

ducatiEnemigo.ataques.push(
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
  sectionVerMapa.style.display = "none";

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
  botonReiniciar.addEventListener("click", reiniciarJuego);
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

  sectionVerMapa.style.display = "flex";
  iniciarMapa();
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
      <button id="${ataque.id}" class="boton-de-class BAtaque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += ataquesMotos;
  });

  botonTurbo = document.getElementById("boton-turbo");
  botonAspirado = document.getElementById("boton-aspirado");
  botonNitro = document.getElementById("boton-nitro");
  botones = document.querySelectorAll(".BAtaque");
}

function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "⚙") {
        ataqueJugador.push("TURBO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent === "💨") {
        ataqueJugador.push("ASPIRADO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("NITRO");
        console.log(ataqueJugador);
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      ataqueAleatorioEnemigo();
    });
  });
}

function seleccionarMotoEnemigo(enemigo) {
  spanMotoEnemigo.innerHTML = enemigo.nombre;
  ataquesMotoEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function ataqueAleatorioEnemigo() {
  let ataqueAleatorio = aleatorio(0, ataquesMotoEnemigo.length - 1);

  if (ataqueAleatorio == 0 || ataqueAleatorio == 1) {
    ataqueEnemigo.push("TURBO");
  } else if (ataqueAleatorio == 3 || ataqueAleatorio == 4) {
    ataqueEnemigo.push("ASPIRADO");
  } else {
    ataqueEnemigo.push("NITRO");
  }
  console.log(ataqueEnemigo);
  iniciarPelea();
}
function iniciarPelea() {
  console.log("iniciar pelea", ataqueJugador);
  if (ataqueJugador.length === 5) {
    combate();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function combate() {
  for (let index = 0; index < ataqueJugador.length; index++) {
    console.log("combate", index);
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("EMPATE");
    } else if (
      ataqueJugador[index] === "TURBO" &&
      ataqueEnemigo[index] === "ASPIRADO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "NITRO" &&
      ataqueEnemigo[index] === "TURBO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "ASPIRADO" &&
      ataqueEnemigo[index] === "NITRO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanVidasJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanVidasEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  revisarVidas();
}

function revisarVidas() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("EMPATASTE PA MAL AHI");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("CONGRATS PA GANASTE UwU");
  } else {
    crearMensajeFinal("PERDISTE DE PIOLA PA :(");
  }
}

function crearMensaje(resultado) {
  let notificacion = document.createElement("p");
  let nuevoAtaqueDelJugador = document.createElement("p");
  let nuevoAtaqueDelEnemigo = document.createElement("p");

  sectionMensajes.innerHTML = resultado;
  nuevoAtaqueDelJugador.innerHTML = indexAtaqueJugador;
  nuevoAtaqueDelEnemigo.innerHTML = indexAtaqueEnemigo;

  ataquesDelJugador.appendChild(nuevoAtaqueDelJugador);
  ataquesDelEnemigo.appendChild(nuevoAtaqueDelEnemigo);
}

function crearMensajeFinal(resultadoFinal) {
  sectionMensajes.innerHTML = resultadoFinal;

  sectionReiniciar.style.display = "block";
}

function reiniciarJuego() {
  location.reload();
}

function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function pintarCanvas() {
  motoJugadorObjeto.x = motoJugadorObjeto.x + motoJugadorObjeto.velocidadX;
  motoJugadorObjeto.y = motoJugadorObjeto.y + motoJugadorObjeto.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaBackground, 0, 0, mapa.width, mapa.height);

  motoJugadorObjeto.pintarMoto();
  yamahaEnemigo.pintarMoto();
  kawasakiEnemigo.pintarMoto();
  ducatiEnemigo.pintarMoto();
  if (
    motoJugadorObjeto.velocidadX !== 0 ||
    motoJugadorObjeto.velocidadY !== 0
  ) {
    revisarColision(yamahaEnemigo);
    revisarColision(kawasakiEnemigo);
    revisarColision(ducatiEnemigo);
  }
}

function moverDerecha() {
  motoJugadorObjeto.velocidadX = 5;
}
function moverIzquierda() {
  motoJugadorObjeto.velocidadX = -5;
}
function moverAbajo() {
  motoJugadorObjeto.velocidadY = 5;
}
function moverArriba() {
  motoJugadorObjeto.velocidadY = -5;
}
function detenerMovimiento() {
  motoJugadorObjeto.velocidadX = 0;
  motoJugadorObjeto.velocidadY = 0;
}

function sePresionoUnaTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  motoJugadorObjeto = obtenerObjetoMoto(motosJugador);
  console.log(motoJugadorObjeto, motosJugador);
  intervalo = setInterval(pintarCanvas, 50);

  window.addEventListener("keydown", sePresionoUnaTecla);

  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerObjetoMoto() {
  for (let i = 0; i < motos.length; i++) {
    if (motosJugador == motos[i].nombre) {
      return motos[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;

  const arribaMoto = motoJugadorObjeto.y;
  const abajoMoto = motoJugadorObjeto.y + motoJugadorObjeto.alto;
  const derechaMoto = motoJugadorObjeto.x + motoJugadorObjeto.ancho;
  const izquierdaMoto = motoJugadorObjeto.x;

  if (
    abajoMoto < arribaEnemigo ||
    arribaMoto > abajoEnemigo ||
    derechaMoto < izquierdaEnemigo ||
    izquierdaMoto > derechaEnemigo
  ) {
    return;
  }

  detenerMovimiento();
  clearInterval(intervalo);
  sectionSeleccionarAtaque.style.display = "flex";
  sectionVerMapa.style.display = "none";
  seleccionarMotoEnemigo(enemigo);
}

window.addEventListener("load", iniciarJuego);
