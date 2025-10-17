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

    } catch (err) {
        return res.status(500).json({ error: "Erro ao enviar mensagem." });
    }
}

async function ListConversationByUser(req, res) {
  try {
    const ConversationByUser = await serviceMessages.ListConversationByUser(req.idUser);

    return res.status(200).json(ConversationByUser);  
  } catch (err) {
    return res.status(500).json({ error: "erro ao listar mensagens"});
  }
};

export default { SendMessage,ListConversationByUser };
