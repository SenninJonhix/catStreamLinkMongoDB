const express = require('express');
const app = express();
const path = require('path');
const { MongoClient, ServerApiVersion } = require('mongodb');
const bodyParser = require('body-parser');
app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

const uri = "mongodb+srv://reto0:reto0@proyecto0.woexhzb.mongodb.net/";
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware para parsear JSON
app.use(bodyParser.json());

// Función para conectar a MongoDB
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

// Ruta para enviar mensajes
app.post('/enviar-mensaje', async (req, res) => {
  try {
    const { remitente, destinatario, contenido } = req.body;

    // Validar que todos los campos estén presentes
    if (!remitente || !destinatario || !contenido) {
      return res.status(400).json({ 
        error: "Faltan campos obligatorios" 
      });
    }

    // Conectar a la base de datos
    const db = await conectarMongoDB();
    const mensajesCollection = db.collection("mensajes");

    // Crear documento de mensaje
    const mensaje = {
      remitente: remitente,
      destinatario: destinatario,
      contenido: contenido,
      fecha: new Date(),
      leido: false
    };

    // Insertar mensaje
    const resultado = await mensajesCollection.insertOne(mensaje);

    // Responder con éxito
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
    // Cerrar conexión
    await client.close();
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.render('../vista/index.ejs');
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

// Manejo de errores no controlados
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});