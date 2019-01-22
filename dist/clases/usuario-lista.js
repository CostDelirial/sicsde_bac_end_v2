"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UsuariosLista {
    constructor() {
        this.lista = [];
    }
    // Agregar un usuario
    agregar(usuario, id) {
        usuario.socketid = id;
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }
    // actualizar usuario
    actualizarNombre(id, nombre) {
        for (let usuario of this.lista) {
            if (usuario.id === id) {
                usuario.nombre = nombre;
                break;
            }
        }
        console.log('Actualizando usuario');
        console.log(this.lista);
    }
    // Obtener lista de usuarios
    getLista() {
        return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');
    }
    getUsuario(id) {
        return this.lista.find((usuario) => {
            return usuario.socketid === id;
        });
    }
    // obtener usuarios en una sala particular
    getUsuariosEnSala(sala) {
        return this.lista.filter(usuario => {
            return usuario.sala === sala;
        });
    }
    // borar un usuario
    borrarUsuario(id) {
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario => {
            return usuario.socketid !== id;
        });
        return tempUsuario;
    }
}
exports.UsuariosLista = UsuariosLista;
