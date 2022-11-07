const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const jugadores = [];

class Jugador {
  constructor(id) {
    this.id = id;
  }

  actualizarPosicion(x, y) {
    this.x = x;
    this.y = y;
  }

  asignarMoto(moto) {
    this.moto = moto;
  }
}

class Moto {
  constructor(nombre) {
    this.nombre = nombre;
  }
}

app.get("/unirse", (req, res) => {
  const id = `${Math.random()}`;

  const jugador = new Jugador(id);

  jugadores.push(jugador);

  res.setHeader("Access-Control-Allow-Origin", "*");

  res.send(id);
});

app.post("/moto-madness/:jugadorId", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const nombre = req.body.motomadness || "";
  const moto = new Moto(nombre);

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].asignarMoto(moto);
  }

  console.log(jugadores);
  console.log(jugadorId);
  res.status(200).json({
    nombre,
    jugadorId,
  });
});

app.post("/moto-madness/:jugadorId/posicion", (req, res) => {
  const jugadorId = req.params.jugadorId || "";
  const x = req.body.x || 0;
  const y = req.body.y || 0;

  const jugadorIndex = jugadores.findIndex(
    (jugador) => jugadorId === jugador.id
  );

  if (jugadorIndex >= 0) {
    jugadores[jugadorIndex].actualizarPosicion(x, y);
  }

  const enemigos = jugadores.filter((jugador) => jugadorId !== jugador.id);

  res.send({
    enemigos,
  });
});

app.listen(8080, () => {
  console.log("servidor funcionando");
});
