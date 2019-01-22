"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../modelos/usuario");
const autenticacion_1 = __importDefault(require("../middlewares/autenticacion"));
const usuarioRoutes = express_1.Router();
// ======================================================
// CREAR USUARIO 
// ======================================================
usuarioRoutes.post('/', autenticacion_1.default, (req, res) => {
    const body = req.body;
    if (req.body.usuario.role !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: "Se requieren permisos de administrador"
        });
    }
    const usuario = new usuario_1.Usuario({
        nombre: body.nombre,
        apellidoP: body.apellidoP,
        apellidoM: body.apellidoM,
        control: body.control,
        password: bcrypt_1.default.hashSync(body.password, 10),
        role: body.role,
        status: body.status
        //creadoX: admin._id
    });
    usuario.save((err, usuarioGuardado) => {
        if (err) {
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
        });
    });
});
// ======================================================
// ENLISTAR USUARIOS 
// ======================================================
usuarioRoutes.get('/', autenticacion_1.default, (req, res) => {
    if (req.body.usuario.rolw !== 'ADMIN_ROLE') {
        return res.status(401).json({
            ok: false,
            mensaje: 'Se requieren permisos de Administrador'
        });
    }
    usuario_1.Usuario.find({}, 'nombre apellidoP apellidoM control status')
        .exec((err, usuarios) => {
        if (err) {
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
    });
});
exports.default = usuarioRoutes;
