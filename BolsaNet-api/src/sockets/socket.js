import serviceMessages from "../services/service.messages.js";
import jwt from "../token.js";
async function socketHandler(io) {
    io.on('connection', (socket) => {
        try {
            const token = socket.handshake.auth.token;
            const payload = jwt.ValidateJWTSocket(token);
            socket.idUser = payload.idUser;
            socket.join(socket.idUser.toString());

    
        } catch (error) {
            socket.disconnect();
        }

        socket.on('ListConversationByUser', async () => {
            try {
                const conversations = await serviceMessages.ListConversationByUser(socket.idUser)
                socket.emit('conversationByUser', conversations)
            } catch (error) {
                socket.emit('erroMensagens', { error: 'Não foi possível carregar as mensagens' });
            }
        })
        socket.on('sendMessage', async (data) => {
            try {
                const message = await serviceMessages.SendMessage({
                    senderId: socket.idUser,
                    recipientId: data.recipientId,
                    message: data.message,
                    sentAt: new Date().toISOString().slice(0, 19).replace('T', ' ')
                });
                io.to(message.senderId.toString()).emit('newMessage', message);
                io.to(message.recipientId.toString()).emit('newMessage', message);

            } catch (error) {
                socket.emit('erroMensagens', { error:error.toString()});
            }
        })
    })
}




export default socketHandler;