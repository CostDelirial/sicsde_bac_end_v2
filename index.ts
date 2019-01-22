import Server from './clases/server';
import { SERVER_PORT } from './global/enviroment';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';


//importar RUTAS
import loginRoutes from './routes/login';
import usuarioRoutes from './routes/usuario';
import denunciaRoutes from './routes/denuncias';



const server = Server.instance;

// body Parser
server.app.use( bodyParser.urlencoded({ extended: true}));
server.app.use( bodyParser.json());

// CORS
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicio
server.app.use('/login', loginRoutes );
server.app.use('/usuario', usuarioRoutes );
server.app.use('/denuncia', denunciaRoutes );

//Conexion a base de datos MONGODB
mongoose.connect('mongodb://localhost/sicsdev2', { useCreateIndex: true, useNewUrlParser: true}, ( err ) => {
    if ( err ) throw err;
    console.log('conectado a la base de datos');
});

server.start(() => {
    console.log(`Servidor corriendo en puerto ${ SERVER_PORT }`);
})


