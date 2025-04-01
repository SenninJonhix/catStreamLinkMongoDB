const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
const rutasUsuarios = require('./rutas/logs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.static(path.join(__dirname, 'vista')));

const PORT = 3000;
const uri = "mongodb+srv://reto0:reto0@proyecto0.woexhzb.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

app.use(bodyParser.json());

async function conectarMongoDB() {
  try {
    await client.connect();
    console.log("Conectado exitosamente a MongoDB");
    return client.db("reto0");
  } catch (error) {
    console.error("Error al conectar a MongoDB:", error);
    throw error;
  }
}

app.use('/api/usuarios', rutasUsuarios);

app.post('/enviar-mensaje', async (req, res) => {
  let conexionAbierta = false;
  try {
    const { remitente, destinatario, contenido } = req.body;

    if (!remitente || !destinatario || !contenido) {
      return res.status(400).json({
        error: "Faltan campos obligatorios"
      });
    }
 
    const db = await conectarMongoDB();
    conexionAbierta = true;
    const mensajesCollection = db.collection("mensajes");
 
    const mensaje = {
      remitente: remitente,
      destinatario: destinatario,
      contenido: contenido,
      fecha: new Date(),
      leido: false
    };

    const resultado = await mensajesCollection.insertOne(mensaje);

    res.status(201).json({
      mensaje: "Mensaje enviado exitosamente",
      id: resultado.insertedId
    });
  } catch (error) {
    console.error("Error al procesar mensaje:", error);
    res.status(500).json({
      error: "Error interno del servidor"
    });
  } finally {
    if (conexionAbierta) {
      await client.close();
    }
  }
});

app.get('/', (req, res) => {
  res.render('../vista/index.ejs');
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login/registro.html'));
});

app.get('/pantalla', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'gato/pantalla.html'));
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});