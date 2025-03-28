const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://reto0:reto0@proyecto0.woexhzb.mongodb.net/?retryWrites=true&w=majority&appName=proyecto0";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Conectar al cliente
    await client.connect();
    
    // Seleccionar la base de datos admin para operaciones de usuario
    const adminDb = client.db("admin");


    // usuario
    const usuarios = [
      {
        user: "Iker",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      },
      {
        user: "Hamza",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      },
      {
        user: "Jonathan",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      },
      {
        user: "Alba",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      },
      {
        user: "Ali",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      },
      {
        user: "Fernando",
        pwd: "Almi123",
        roles: [{ role: "readWrite", db: "reto0" }]
      }
    ];

    // crear usuarios
    for (const usuario of usuarios) {
      try {
        await adminDb.command({
          createUser: usuario.user,
          pwd: usuario.pwd,
          roles: usuario.roles
        });
        console.log(`Usuario ${usuario.user} creado exitosamente`);
      } catch (error) {
        // Manejar errores (por ejemplo, usuario ya existente)
        console.error(`Error al crear usuario ${usuario.user}:`, error.message);
      }
    }

  } catch (error) {
    console.error("Error en la operación:", error);
  } finally {
    // Cerrar la conexión
    await client.close();
  }
}

run().catch(console.dir);