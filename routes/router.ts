import  { Router, Request, Response } from 'express';
import Server from '../clases/server';
import { usuariosConectados } from '../sockets/sockets';
import { emit } from 'cluster';

const router = Router();

router.get('/mensajes', (req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});


router.post('/mensajes/:id', (req: Request, res: Response) => {
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.body.id;

    const payload = {
        de,
        cuerpo
    }
const server = Server.instance;

server.io.in(id).emit('mensaje-privado', payload );

    res.json({
        ok:true,
        de,
        cuerpo,
        id
    });
});


export default router;