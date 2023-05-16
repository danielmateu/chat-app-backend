
const { Router } = require('express');

const router = Router();

// Crear nuevos usuarios
router.post('/new', (req, res) => {
    res.json({
        ok: true,
        msg: 'Register'
    });
});

// Login
router.post('/', (req, res) => {
    res.json({
        ok: true,
        msg: 'Login'
    });
})

// Revalidar token
router.get('/renew', (req, res) => {
    res.json({
        ok: true,
        msg: 'Renew Token'
    });
})



module.exports = router;