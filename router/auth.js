
// path: api/login
const { Router } = require('express');
const { crearUsuario, login, renewToken } = require('../controller/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

// Crear nuevos usuarios
router.post('/new', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }).not().isEmpty(),
    validarCampos
], crearUsuario);

// Login
router.post('/', [
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password debe de ser de 6 caracteres').isLength({ min: 6 }).not().isEmpty(),
    validarCampos
], login)

// Revalidar token
router.get('/renew', renewToken)



module.exports = router;