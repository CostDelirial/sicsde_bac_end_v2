"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
const rolesValidos = {
    values: ['ADMIN_ROLE', 'DENUNCIA_ROLE', 'GERENTE_ROLE', 'SUBGE_ROLE', 'SUP_INT_ROLE', 'JEFE_GRUPO_ROLE'],
    message: '{VALUE} no es una role permitido'
};
exports.usuarioSchema = new mongoose_1.Schema({
    nombre: { type: String, required: [true, 'El nombre es obligatorio'] },
    apellidoP: { type: String, required: [true, 'El apellido Paterno es obligatorio'] },
    apellidoM: { type: String, required: false },
    control: { type: String, unique: true, required: [true, 'El numero de Control/Ficha es obligatorio'] },
    password: { type: String, required: [true, 'La contraseña es obligatoria'] },
    img: { type: String, required: false },
    role: { type: String, required: true, default: 'USER_ROLE', enum: rolesValidos },
    status: { type: String, required: true, default: 'ACTIVO' },
    lingreso: { type: String, required: false },
    creadoX: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario' },
}, { collection: 'usuarios' });
exports.usuarioSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.Usuario = mongoose_1.model("Usuario", exports.usuarioSchema);
