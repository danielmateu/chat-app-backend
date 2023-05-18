

const { usuarioConectado, usuarioDesconectado } = require('../controller/sockets');
const { comprobarJWT } = require('../helpers/jwt');

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
            // console.log('Cliente conectado', uid);
            await usuarioConectado(uid);
            // TODO Emitir todos los usuarios conectados


            // TODO Socket join, uid

            // TODO Escuchar cuando el cliente manda un mensaje -> mensaje-personal

            // TODO Disconnect
            socket.on('disconnect', async () => {
                // console.log('Cliente desconectado', uid);
                await usuarioDesconectado(uid);
            });
            // Marcar en la BD que el usuario se desconectó
            // TODO Emitir todos los usuarios conectados



        });
    }


}


module.exports = Sockets;