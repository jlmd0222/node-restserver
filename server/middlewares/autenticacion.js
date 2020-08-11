const jwt = require('jsonwebtoken');

//
// verificar token
//
// siempre se debe ejecutar el next() para indicar que continue la ejecucion del programa, de lo contrario se queda en este metodo
let verificaToken = (req, res, next) => {
    let token = req.get('Authorization');

    jwt.verify(token, process.env.SEED, (err, decoded) => {
        if (err) {
            return res.status(401).json({
                ok: false,
                err: {
                    message: 'Token no válido'
                }
            });
        }

        req.usuario = decoded.usuario;
        next();
    })
};

//
// verifica ADMIN Role
//
let verificaAdminRole = (req, res, next) => {
    let usuario = req.usuario;

    if (!usuario.role === 'ADMIN_ROLE') {
        res.json({
            ok: false,
            err: {
                message: 'Debe ser administrador para realizar el proceso'
            }
        });
    } else if (usuario.role === 'ADMIN_ROLE') {
        next();
    }
};

module.exports = {
    verificaToken,
    verificaAdminRole
}