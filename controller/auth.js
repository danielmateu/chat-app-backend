const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');



// Crear usuario
const crearUsuario = async (req, res = response) => {

    try {
        const { email, password } = req.body;

        const existeEmail = await Usuario.findOne({ email });
        // console.log(existeEmail);

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        
        // Guardar usuario
        const usuario = new Usuario(req.body);
        usuario.password = bcrypt.hashSync(password, salt);
        
        await usuario.save();

        res.json({
            usuario
        });


    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        });
    }
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