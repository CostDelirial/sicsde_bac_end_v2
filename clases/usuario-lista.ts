import { IUsuario } from '../interfaces/usuario';

 export class UsuariosLista {
     private lista: IUsuario[] = [];
      constructor() {

      }

      // Agregar un usuario
      public agregar( usuario: IUsuario, id: string) {
          usuario.socketid = id;
          this.lista.push( usuario );
          console.log( this.lista );
          return usuario;
      }

      // actualizar usuario
      public actualizarNombre( id: string, nombre: string ) {
          for ( let usuario of this.lista ) {
              if( usuario.id === id ) {
                  usuario.nombre = nombre;
                  break;
              }
          }
          console.log('Actualizando usuario');
          console.log( this.lista );
      }

      // Obtener lista de usuarios
      public getLista() {
          return this.lista.filter( usuario => usuario.nombre !== 'sin-nombre' );
      }

      public getUsuario( id:string ) {
          return this.lista.find( ( usuario: IUsuario ) => {
              return usuario.socketid === id;
          });
      }

      // obtener usuarios en una sala particular
      public getUsuariosEnSala( sala: string ) {
          return this.lista.filter( usuario => {
              return usuario.sala === sala;
          });
      }

      // borar un usuario
      public borrarUsuario( id: string ) {
        const tempUsuario = this.getUsuario( id );
        this.lista = this.lista.filter( usuario => {
            return usuario.socketid !== id;
        });
        return tempUsuario;
      }
 }