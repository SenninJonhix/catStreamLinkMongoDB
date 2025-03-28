const { MongoClient, ServerApiVersion } = require('mongodb');

// IMPORTANTE: Reemplaza con credenciales de usuario ADMIN
const uri = "mongodb+srv://reto0:reto0@proyecto0.woexhzb.mongodb.net/";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});


