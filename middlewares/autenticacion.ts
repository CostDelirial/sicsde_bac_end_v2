import { Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import { SEED } from '../global/enviroment';

function verificaToken( req: Request, res: Response, next: any) {
    const token: any = req.headers.authorization;

    verify( token, SEED, (err: any, decode: any) => {
        if( err ){
            return res.status(401).json({
                ok:false,
                mensaje: ' token incorrecto'
            });
        }

        req.body.usuario = decode.usuario;
        next();
    });
}

export default verificaToken;