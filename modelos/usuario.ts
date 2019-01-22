import { Document, Schema, Model, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IUsuario } from '../interfaces/usuario';

export interface IUsuarioModel extends IUsuario, Document {
    fullName: string;
}


const rolesValidos = {
values: ['ADMIN_ROLE','DENUNCIA_ROLE','GERENTE_ROLE','SUBGE_ROLE','SUP_INT_ROLE','JEFE_GRUPO_ROLE'],
message: '{VALUE} no es una role permitido'
};

export var usuarioSchema: Schema = new Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellidoP: { type: String, required: [true, 'El apellido Paterno es obligatorio']},
    apellidoM: { type: String, required: false},
    control: { type: String,unique: true, required: [true, 'El numero de Control/Ficha es obligatorio']},
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    status: { type: String, required: true, default: 'ACTIVO'},
    lingreso: {type: String, required: false },
    creadoX: { type: Schema.Types.ObjectId, ref: 'Usuario'},
}, { collection: 'usuarios' });

usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe ser unico' });

export const Usuario: Model<IUsuarioModel> = model<IUsuarioModel>("Usuario", usuarioSchema);
