import { Document, Schema, Model, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import { IDenuncia } from '../interfaces/IDenuncia';



export interface IDenunciaModel extends IDenuncia, Document {
    fullName: string;
}


export var denunciaSchema: Schema = new Schema({
    consecutivo:{type: Number,required: true},
    folio_sse:{type: String,unique: true, required: [true, 'El folio debe ser unico'] },
    folio_depto:{type: String, required: false},
    fecha_recepcion:{type: String, required:[ true, 'La fecha de rececpcion es obligatoria']},
    fecha_captura:{type: String, required:[true, 'La fecha de captura es obligatoria']},
    paginas:{type: Number, required: false},
    depto:{type: String, required: [true, 'El departamento es necesario ']},
    tipo:{type: String, required:[true, 'El tipo de denuncia es requerido']},
    clasificacion:{type: String, required: [true, 'La clasificacion de la denuncia es necesaria']},
    correo_recibio:{type: String, required: false},
    telefono_recibio:{type: String, required: false},
    correo_denunciante:{type: String, required: false},
    telefono_denunciante:{type: String, required: false },
    resumen_denuncia:{type: String, required: [true, 'Es obligatorio el resumen de la denuncia']},
    descripcion_completa:{type: String, required:['Es obligatoria la descripcion completa de la denuncia']},
    usuario:{type: Schema.Types.ObjectId, ref: 'Usuario', required: true}
}, { collection: 'denuncias' });

denunciaSchema.plugin(uniqueValidator, {message: '{PATH} debe ser unico'});

export const Denuncia: Model<IDenunciaModel> = model<IDenunciaModel>("Denuncia", denunciaSchema)



