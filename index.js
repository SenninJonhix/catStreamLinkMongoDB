const express = require('express');
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://reto0:reto0@proyecto0.woexhzb.mongodb.net/?retryWrites=true&w=majority&appName=proyecto0";

const app = express();

app.use(express.static('public'));
app.use(express.json());

app.set('view engine', 'ejs');

const usuarios = [
    { user: "Iker", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] },
    { user: "Hamza", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] },
    { user: "Jonathan", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] },
    { user: "Alba", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] },
    { user: "Ali", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] },
    { user: "Fernando", pwd: "Almi123", roles: [{ role: "readWrite", db: "reto0" }] }
];

async function createMongoUsers() {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    try {
        await client.connect();
        console.log('Connected to MongoDB successfully');
        
        const adminDb = client.db("admin");

        for (const usuario of usuarios) {
            try {
                await adminDb.command({
                    createUser: usuario.user,
                    pwd: usuario.pwd,
                    roles: usuario.roles
                });
                console.log(`User ${usuario.user} created successfully`);
            } catch (error) {
                console.error(`Error creating user ${usuario.user}:`, error.message);
            }
        }
    } catch (error) {
        console.error("Error in MongoDB operation:", error);
    } finally {
        await client.close();
    }
}

async function connectMongoose() {
    try {
        await mongoose.connect(uri, { 
            dbName: 'reto0',
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        });
        console.log('Mongoose connection successful');
    } catch (err) {
        console.error('Mongoose connection error:', err);
    }
}

app.get('/', (req, res) => {
    res.render('index.ejs', { mensaje: 'test' });
});

const logsRouter = require('./rutas/logs');
app.use('/logs', logsRouter);

async function startServer() {
    await createMongoUsers();
    await connectMongoose();
    
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}

startServer().catch(console.error);