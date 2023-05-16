const jwt = require('jsonwebtoken');


const validarJWT = (req, res, next) => {

    try {

        const token = req.header('x-token');

        // res.json({
        //     ok: true,
        //     token
        // })

        if (!token) {
            return res.status(401).json({
                ok: false,
                msg: 'No hay token en la petición'
            });
        }

        const { uid } = jwt.verify(token, process.env.JWT_KEY);

        req.uid = uid;

        next();

    } catch (error) {
        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }
}

module.exports = {
    validarJWT
}