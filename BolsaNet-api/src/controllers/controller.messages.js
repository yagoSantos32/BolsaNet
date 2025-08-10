import serviceMessages from "../services/service.messages.js";

async function SendMessage(req, res) {
    try {
        const messageData = {
            senderId: req.idUser,  // id do usuário autenticado
            sentAt: new Date().toISOString(),
            ...req.body             
        };

        const message = await serviceMessages.SendMessage(messageData)
        return res.status(200).json(message);

    } catch (error) {

        return res.status(500).json({ error: "erro ao enviar mensagem" });
    }

}

export default { SendMessage };