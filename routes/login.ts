import { Router, Request, Response } from  'express';
import bcrypt from 'bcrypt';
import { Usuario } from '../modelos/usuario';
import jwt from 'jsonwebtoken';
import { SEED } from '../global/enviroment';

const loginRoutes = Router();


// ================================================
// LOGIN 
// ================================================

loginRoutes.post('/', ( req: Request, res: Response ) => {

    const body = req.body;

    Usuario.findOne( {control: body.control}, ( err, usuarioDB) => {
        if ( err ) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al tratar de ingresar',
                err: err
            });
        }
        if ( !usuarioDB ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Datos incorrectos - control',
                err: err
            });
        }
        if ( usuarioDB.status === 'INACTIVO') {
            return res.status(200).json({
                ok: false,
                mensaje: 'El usuario esta inactivo, cotacte al administrador'
            });
        }
        if ( !bcrypt.compareSync( body.password, usuarioDB.password ) ) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password'
            });
        }

        usuarioDB.lingreso = new Date().toLocaleString();

        usuarioDB.save((err, usuarioDBA) => {
            if ( err ) {
                console.log(' Error al actualizarce el inicio de secion');
            }
            const token = jwt.sign({ usuario: usuarioDBA }, SEED, { expiresIn: 14440 });
            usuarioDBA.password = '===>|<===';
            res.status(200).json({
                ok: true,
                usuario: usuarioDB,
                token: token,
                id: usuarioDB._id
            });
        });
    });
});

export default loginRoutes;