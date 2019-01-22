"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const denuncia_1 = require("../modelos/denuncia");
const autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
const denunciaRoutes = express_1.Router();
// ===================================================
// CREAR DENUNCIA
// ===================================================
denunciaRoutes.post('/', autenticacion_1.default, (req, res) => {
    var body = req.body;
    inicializar().then((resp) => {
        const denuncia = new denuncia_1.Denuncia({
            consecutivo: resp,
            folio_sse: 'F-SSE-' + resp + '-/' + new Date().getFullYear(),
            folio_depto: body.folio_depto,
            fecha_recepcion: body.fecha_recepcion,
            fecha_captura: body.fecha_captura,
            paginas: body.paginas,
            depto: body.depto,
            tipo: body.tipo,
            clasificacion: body.clasificacion,
            correo_recibio: body.correo_recibio,
            telefono_recibio: body.telefono_recibio,
            correo_denunciante: body.correo_denunciante,
            telefono_denunciante: body.telefono_denunciante,
            resumen_denuncia: body.resumen_denuncia,
            descripcion_completa: body.descripcion_completa,
            usuario: body.usuario._id
        });
        denuncia.save((err, denunciaGuardada) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    mensaje: 'Erro al guardar denuncia',
                    err: err
                });
            }
            res.status(200).json({
                ok: true,
                denuncia: denunciaGuardada,
                usuarioToken: body.usuario
            });
        });
    }).catch((err) => {
        if (err) {
            res.status(500).json({
                ok: false,
                err
            });
        }
    });
});
// ====================================================
// ENLISTAR DENUNCIAS
// ====================================================
denunciaRoutes.get('/', autenticacion_1.default, (req, res) => {
    if (req.body.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: "Se requieren permisos de administrador"
        });
    }
    denuncia_1.Denuncia.find({}, 'folio_sse folio_depto fecha_recepcion fecha_captura resumen_denuncia')
        .exec((err, denuncias) => {
        if (err) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al enlistar denuncia',
                err
            });
        }
        res.status(200).json({
            ok: true,
            denuncias
        });
    });
});
// ========================================================
// PROMESA PARA REGISTRAR DENUNCIA
// ========================================================
function inicializar() {
    const inic = new Promise((resolve, reject) => {
        denuncia_1.Denuncia.countDocuments((err, count) => {
            if (err) {
                reject('Error al contar documentos');
            }
            if (count < 1) {
                resolve(1);
            }
            else {
                denuncia_1.Denuncia.find()
                    .sort({ consecutivo: -1 })
                    .exec((err, cons) => {
                    if (err) {
                        reject('Error al recuperar consecutivo');
                    }
                    resolve(cons[0].consecutivo + 1);
                });
            }
        });
    });
    return inic;
}
exports.default = denunciaRoutes;
