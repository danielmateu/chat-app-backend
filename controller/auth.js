// Crear usuario
const crearUsuario = async (req, res) => {

    res.json({
        ok: true,
        msg: 'Register'
    });
}

// login
const login = async (req, res) => {

    const { email, password } = req.body;

    res.json({
        ok: true,
        msg: 'Login',
        email,
        password
    });
}

// renewToken
const renewToken = async (req, res) => {
    res.json({
        ok: true,
        msg: 'Renew'
    });
}



module.exports = {
    crearUsuario,
    login,
    renewToken
}