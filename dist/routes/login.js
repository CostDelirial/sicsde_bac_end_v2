"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bcrypt_1 = __importDefault(require("bcrypt"));
const usuario_1 = require("../modelos/usuario");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const enviroment_1 = require("../global/enviroment");
const loginRoutes = express_1.Router();
// ================================================
// LOGIN 
// ================================================
loginRoutes.post('/', (req, res) => {
    const body = req.body;
    usuario_1.Usuario.findOne({ control: body.control }, (err, usuarioDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al tratar de ingresar',
                err: err
            });
        }
        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Datos incorrectos - control',
                err: err
            });
        }
        if (usuarioDB.status === 'INACTIVO') {
            return res.status(200).json({
                ok: false,
                mensaje: 'El usuario esta inactivo, cotacte al administrador'
            });
        }
        if (!bcrypt_1.default.compareSync(body.password, usuarioDB.password)) {
            return res.status(400).json({
                ok: false,
                mensaje: 'credenciales incorrectas - password'
            });
        }
        usuarioDB.lingreso = new Date().toLocaleString();
        usuarioDB.save((err, usuarioDBA) => {
            if (err) {
                console.log(' Error al actualizarce el inicio de secion');
            }
            const token = jsonwebtoken_1.default.sign({ usuario: usuarioDBA }, enviroment_1.SEED, { expiresIn: 14440 });
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
exports.default = loginRoutes;
