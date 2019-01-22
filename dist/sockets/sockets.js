"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const usuario_lista_1 = require("../clases/usuario-lista");
exports.usuariosConectados = new usuario_lista_1.UsuariosLista();
exports.conectarCliente = (cliente, io) => {
    console.log('Usuario ' + cliente.id + ' conectado');
    io.to(cliente.id).emit('logueate-usuario');
};
exports.desconectar = (cliente, io) => {
    cliente.on('disconnect', () => {
        exports.usuariosConectados.borrarUsuario(cliente.id);
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
// escuchar mensajes
exports.mensajes = (cliente, io) => {
    cliente.on('mensaje', (payload) => {
        console.log('Mensaje recibido', payload);
        io.emit('mensaje-nuevo', payload);
    });
};
// Configuracion nombre de uaurio
exports.configurarUsuario = (cliente, io) => {
    cliente.on('configurar-usuario', (payload, callback) => {
        exports.usuariosConectados.agregar(payload, cliente.id);
        io.to(cliente.id).emit('usuario-logueado');
        io.emit('usuarios-activos', exports.usuariosConectados.getLista());
        callback({
            ok: true,
            mensaje: `Usuario ${cliente.id}, configurado`
        });
    });
};
//obtener usuario
exports.obtenerUsuarios = (cliente, io) => {
    cliente.on('obtener-usuarios', () => {
        io.to(cliente.id).emit('usuarios-activos', exports.usuariosConectados.getLista());
    });
};
