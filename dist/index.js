"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = __importDefault(require("./clases/server"));
const enviroment_1 = require("./global/enviroment");
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
//importar RUTAS
const login_1 = __importDefault(require("./routes/login"));
const usuario_1 = __importDefault(require("./routes/usuario"));
const denuncias_1 = __importDefault(require("./routes/denuncias"));
const server = server_1.default.instance;
// body Parser
server.app.use(body_parser_1.default.urlencoded({ extended: true }));
server.app.use(body_parser_1.default.json());
// CORS
server.app.use(cors_1.default({ origin: true, credentials: true }));
// Rutas de servicio
server.app.use('/login', login_1.default);
server.app.use('/usuario', usuario_1.default);
server.app.use('/denuncia', denuncias_1.default);
//Conexion a base de datos MONGODB
mongoose_1.default.connect('mongodb://localhost/sicsdev2', { useCreateIndex: true, useNewUrlParser: true }, (err) => {
    if (err)
        throw err;
    console.log('conectado a la base de datos');
});
server.start(() => {
    console.log(`Servidor corriendo en puerto ${enviroment_1.SERVER_PORT}`);
});
