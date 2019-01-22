import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Server from '../clases/server';
import { Denuncia } from '../modelos/denuncia';
import verificaToken from '../middlewares/autenticacion';

const denunciaRoutes = Router();


// ===================================================
// CREAR DENUNCIA
// ===================================================
denunciaRoutes.post('/',verificaToken,(req: Request, res:Response) => {
    var body = req.body;

    inicializar().then((resp) => {
        const denuncia = new Denuncia({
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
            if ( err ) {
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
        if ( err ) {
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
denunciaRoutes.get('/', verificaToken, (req: Request, res: Response) => {
    
    if( req.body.usuario.role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            ok:false,
            mensaje: "Se requieren permisos de administrador" 
        });
    }
    
    Denuncia.find({}, 'folio_sse folio_depto fecha_recepcion fecha_captura resumen_denuncia')
    .exec( (err, denuncias)=> {
        if( err ) {
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al enlistar denuncia',
                err
            });
        }
        res.status(200).json({
            ok: true,
            denuncias
        })
    });
});



// ========================================================
// PROMESA PARA REGISTRAR DENUNCIA
// ========================================================
function inicializar() {
    const inic = new Promise((resolve, reject) => {
        Denuncia.countDocuments((err, count) => {
            if ( err ) {
                reject('Error al contar documentos');
            }

            if ( count < 1 ) {
                resolve(1);
            } else {
                Denuncia.find()
                        .sort({consecutivo: -1})
                        .exec((err, cons) => {
                            if ( err ) {
                                reject('Error al recuperar consecutivo');
                            }
                             resolve(cons[0].consecutivo + 1); 
                        });
            }
        });
    });

    return inic;
}

export default denunciaRoutes;
