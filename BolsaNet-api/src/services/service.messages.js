import repositoryMessages from "../repositories/repository.messages.js";
import repositoryUser from "../repositories/repository.user.js";


async function SendMessage(messageData) {

    const { senderId, recipientId, message, sentAt } = messageData;
    if (recipientId) {
        return await repositoryMessages.SendMessage(senderId, recipientId, message, sentAt);
    }
    const lastMessage = await repositoryMessages.getLastMessageByUser(senderId)
    let finalRecipientId;
    if (!lastMessage) {
        finalRecipientId = await repositoryUser.getRandomAdminId();
    } else {
        const timeSinceLastMessage = (new Date(sentAt) - new Date(lastMessage.sentAt)) / 60000;
       

        if (timeSinceLastMessage >= 1) {
           
            finalRecipientId = await repositoryUser.getRandomAdminId();
           
        } else {
           
            finalRecipientId = lastMessage.recipientId;
        }
    }
    const messageItem = await repositoryMessages.SendMessage(senderId, finalRecipientId, message, sentAt)

    return messageItem;
}

export default { SendMessage };
