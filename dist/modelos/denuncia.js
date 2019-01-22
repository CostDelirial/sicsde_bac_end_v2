"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const mongoose_unique_validator_1 = __importDefault(require("mongoose-unique-validator"));
exports.denunciaSchema = new mongoose_1.Schema({
    consecutivo: { type: Number, required: true },
    folio_sse: { type: String, unique: true, required: [true, 'El folio debe ser unico'] },
    folio_depto: { type: String, required: false },
    fecha_recepcion: { type: String, required: [true, 'La fecha de rececpcion es obligatoria'] },
    fecha_captura: { type: String, required: [true, 'La fecha de captura es obligatoria'] },
    paginas: { type: Number, required: false },
    depto: { type: String, required: [true, 'El departamento es necesario '] },
    tipo: { type: String, required: [true, 'El tipo de denuncia es requerido'] },
    clasificacion: { type: String, required: [true, 'La clasificacion de la denuncia es necesaria'] },
    correo_recibio: { type: String, required: false },
    telefono_recibio: { type: String, required: false },
    correo_denunciante: { type: String, required: false },
    telefono_denunciante: { type: String, required: false },
    resumen_denuncia: { type: String, required: [true, 'Es obligatorio el resumen de la denuncia'] },
    descripcion_completa: { type: String, required: ['Es obligatoria la descripcion completa de la denuncia'] },
    usuario: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Usuario', required: true }
}, { collection: 'denuncias' });
exports.denunciaSchema.plugin(mongoose_unique_validator_1.default, { message: '{PATH} debe ser unico' });
exports.Denuncia = mongoose_1.model("Denuncia", exports.denunciaSchema);
