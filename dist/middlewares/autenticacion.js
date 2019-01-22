"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = require("jsonwebtoken");
const enviroment_1 = require("../global/enviroment");
function verificaToken(req, res, next) {
    const token = req.headers.authorization;
    jsonwebtoken_1.verify(token, enviroment_1.SEED, (err, decode) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                mensaje: ' token incorrecto'
            });
        }
        req.body.usuario = decode.usuario;
        next();
    });
}
exports.default = verificaToken;
