import { Socket } from 'socket.io';
import socketIO from 'socket.io';
import { UsuariosLista } from '../clases/usuario-lista';

export const usuariosConectados = new UsuariosLista();

export const conectarCliente = ( cliente: Socket, io: socketIO.Server ) => {
    console.log('Usuario ' + cliente.id + ' conectado');
    io.to(cliente.id).emit('logueate-usuario');
}

export const desconectar = ( cliente: Socket, io: socketIO.Server ) => {
    cliente.on('disconnect', () => {
        usuariosConectados.borrarUsuario( cliente.id );
        io.emit('usuarios-activos', usuariosConectados.getLista() );
    });
}

// escuchar mensajes

export const mensajes = ( cliente: Socket, io:socketIO.Server ) => {
    cliente.on('mensaje', ( payload: { de: string, cuerpo: string } ) => {
        console.log('Mensaje recibido', payload );
        io.emit('mensaje-nuevo', payload );
    });
}

// Configuracion nombre de uaurio
export const configurarUsuario = ( cliente: Socket, io:socketIO.Server ) => {
    cliente.on('configurar-usuario', ( payload, callback: Function ) => {
        usuariosConectados.agregar( payload, cliente.id);
        io.to(cliente.id).emit('usuario-logueado');
        io.emit('usuarios-activos', usuariosConectados.getLista() );

        callback({
            ok: true,
            mensaje: `Usuario ${ cliente.id }, configurado`
        });
    });
}

//obtener usuario
export const obtenerUsuarios = (cliente: Socket, io:socketIO.Server ) => {
    cliente.on('obtener-usuarios', () => {
        io.to( cliente.id).emit('usuarios-activos', usuariosConectados.getLista() );
    });
}

