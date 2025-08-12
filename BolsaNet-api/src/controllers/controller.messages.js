import serviceMessages from "../services/service.messages.js";

async function SendMessage(req, res) {
    try {
        const messageData = {
            senderId: req.idUser,
            sentAt: new Date().toISOString().slice(0, 19).replace('T', ' '),
            ...req.body
        };

        const message = await serviceMessages.SendMessage(messageData);

        if (message.recipientId === message.senderId) {
            throw new Error("Você não pode enviar mensagem para si mesmo.");
        }

        return res.status(200).json(message);

    } catch (error) {
        return res.status(500).json({ error: "Erro ao enviar mensagem." });
    }
}

export default { SendMessage };
