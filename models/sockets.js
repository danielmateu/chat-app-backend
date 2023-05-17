const { comprobarJWT } = require('../helpers/jwt');

class Sockets {

    constructor(io) {

        this.io = io;

        this.socketEvents();
    }

    socketEvents() {
        // On connection
        this.io.on('connection', (socket) => {

            // console.log(socket.handshake.query['x-token']);
            const [valido, uid] = comprobarJWT(socket.handshake.query['x-token']);

            if (!valido) {
                console.log('Cliente no autenticado');
                return socket.disconnect()
            }
            console.log('Cliente conectado', uid);

            // TODO Validar el JWT
            // Si el token no es válido, desconectar

            // Saber qué usuario está activo mediante el UID

            // TODO Emitir todos los usuarios conectados

            // TODO Socket join, uid

            // TODO Escuchar cuando el cliente manda un mensaje -> mensaje-personal

            // TODO Disconnect
            socket.on('disconnect', () => {
                console.log('Cliente desconectado', uid);
            });
            // Marcar en la BD que el usuario se desconectó
            // TODO Emitir todos los usuarios conectados



        });
    }


}


module.exports = Sockets;