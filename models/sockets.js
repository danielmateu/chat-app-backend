

const { usuarioConectado, usuarioDesconectado, getUsuarios, grabarMensaje } = require('../controller/sockets');
const { comprobarJWT } = require('../helpers/jwt');
const usuario = require('./usuario');

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', async (socket) => {

            // console.log(socket.handshake.query['x-token']);
            // TODO Validar el JWT
            // Si el token no es válido, desconectar
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);
            // Saber qué usuario está activo mediante el UID
            if (!valido) {
                console.log('Cliente no autenticado');
                return socket.disconnect()
            }

            const usuario = await usuarioConectado(uid);

            // TODO unir a usuario a sala de socket.io
            socket.join(uid);

            console.log('Cliente conectado: ', usuario.nombre);

            // TODO Emitir todos los usuarios conectados
            this.io.emit('lista-usuarios', await getUsuarios());


            // TODO Socket join, uid

            // TODO Escuchar cuando el cliente manda un mensaje -> mensaje-personal
            socket.on('mensaje-personal', async (payload) => {
                // console.log(payload);
                // TODO Grabar mensaje en la BD
                const mensaje = await grabarMensaje(payload);
                console.log(mensaje);
                // TODO Emitir evento a la persona que se le envía el mensaje
                this.io.to(payload.para).emit('mensaje-personal', mensaje);
                this.io.to(payload.de).emit('mensaje-personal', mensaje);
            })

            // TODO Disconnect
            socket.on('disconnect', async () => {
                // console.log('Cliente desconectado', uid);
                const usuario = await usuarioDesconectado(uid);
                console.log('Cliente desconectado: ', usuario.nombre);

                // TODO Emitir cuando el usuario se desconecta
                // this.io.emit('usuario-desconectado', await getUsuarios());
                this.io.emit('lista-usuarios', await getUsuarios());
            });
            // Marcar en la BD que el usuario se desconectó
            // TODO Emitir todos los usuarios conectados



        });
    }


}


module.exports = Sockets;