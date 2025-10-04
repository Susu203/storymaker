import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import IdeaRoutes from './routes/ai.js';

//Cargar las variables de entorno desde el archivo .env
dotenv.config();

//Inicializar la aplicación Express
const app=  express();

//Middlewares
app.use(cors()); //Habilita cors
app.use(express.json()); //Para parsear las solicitudes JSON

//Rutas
app.get('/', (req, res) => {
    res.send('API is running...working fine');
});

//Usa las rutas definidas en routes/ai.js para manejar las solicitudes a /api/ai
app.use('/api/ai', IdeaRoutes);

//Define el purto del backend en env o por defecto el 5000
const PORT = process.env.PORT || 5000;

//Inicia el servidor en el puerto definido
app.listen(PORT, console.log(`Server running on PORT ${PORT}`));