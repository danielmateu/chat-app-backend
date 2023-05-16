const { response } = require('express');
const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');



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


        // Guardar usuario
        const usuario = new Usuario(req.body);
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        // Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
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

    try {
        const { email, password } = req.body;
        const existeEmail = await Usuario.findOne({ email });

        if (!existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo no existe'
            });
        }

        // Confirmar los passwords
        const validPassword = bcrypt.compareSync(password, existeEmail.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // Generar el JWT
        const token = await generarJWT(existeEmail.id);

        res.json({
            ok: true,
            msg: 'Login',
            email,
            password,
            token

        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor hable con el administrador'
        })
    }
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