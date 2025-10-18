import repositoryMessages from "../repositories/repository.messages.js";
import repositoryUser from "../repositories/repository.user.js";


async function SendMessage(messageData) {

    const { senderId, recipientId, message, sentAt } = messageData;
    if (recipientId) {
        return await repositoryMessages.SendMessage(senderId, recipientId, message, sentAt);
    }


    // obtém a última mensagem enviada pelo usuário logado
    const lastMessage = await repositoryMessages.getLastMessageByUser(senderId);

    let finalRecipientId;

    if (!lastMessage) {
        finalRecipientId = await repositoryUser.getRandomAdminId(senderId); // nunca retorna o senderId
    } else {
        const timeSinceLastMessage = (new Date(sentAt) - new Date(lastMessage.sentAt)) / 60000;

        if (timeSinceLastMessage >= 5) {
            // mais de 5 minutos, escolhe um admin aleatório diferente do sender
            finalRecipientId = await repositoryUser.getRandomAdminId(senderId);
        } else {
            // mantém a lógica, mas **garante que finalRecipientId != senderId**
            if (lastMessage.senderId === senderId) {
                finalRecipientId = lastMessage.recipientId;
            } else {
                // última mensagem veio do admin, então destinatário é o admin
                finalRecipientId = lastMessage.senderId;
            }
        }
    }

    const messageItem = await repositoryMessages.SendMessage(senderId, finalRecipientId, message, sentAt)

    return messageItem;
}

async function ListConversationByUser(iduser) {
    const ConversationByUser = await repositoryMessages.ListConversationByUser(iduser);
    return ConversationByUser

}

export default { SendMessage, ListConversationByUser };
