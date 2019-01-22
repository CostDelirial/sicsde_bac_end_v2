import { Router, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import Server from '../clases/server';
import { Usuario } from '../modelos/usuario';
import verificaTocke from '../middlewares/autenticacion';

const usuarioRoutes = Router();

// ======================================================
// CREAR USUARIO 
// ======================================================
usuarioRoutes.post('/',verificaTocke, ( req: Request, res: Response) => {
    const body = req.body;
    
    if( req.body.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok:false,
            mensaje: "Se requieren permisos de administrador" 
        });
    }

    const usuario = new Usuario({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        control: body.control,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
        status: body.status
        //creadoX: admin._id
    });
usuario.save( (err, usuarioGuardado) => {
    if( err ) {
        return res.status(500).json({
            ok: false,
            mensaje: 'Error al crear Usuario',
            err: err
        });
    }

    usuarioGuardado.password = ' ===>|<===';

    console.log(usuarioGuardado);
    res.status(200).json({
        ok: true,
        usuario: usuarioGuardado
    })
})



});
// ======================================================
// ENLISTAR USUARIOS 
// ======================================================
usuarioRoutes.get('/', verificaTocke, ( req: Request, res: Response ) => {
    console.log(req.body.usuario.role);
    /*if( req.body.usuario.role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            ok:false,
            mensaje: 'Se requieren permisos de Administrador'
        });
    }*/

    Usuario.find({}, 'nombre apellidoP apellidoM control status')
    .exec( ( err, usuarios ) => {
        if ( err ){
            return res.status(500).json({
                ok: true,
                mensaje: 'Error al cargar usuarios',
                err
            });
        }
        res.status(200).json({
            ok: true,
            usuarios
        });
    })
});

export default usuarioRoutes;