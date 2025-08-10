import repositoryMessages from "../repositories/repository.messages.js";
import repositoryUser from "../repositories/repository.user.js";


async function SendMessage(messageData) {

    const { senderId,recipientId, message, sentAt } = messageData;
    let finalRecipientId = recipientId;
    if(!recipientId){
        finalRecipientId = await repositoryUser.getRandomAdminId()
    }
    
    const messageItem = await repositoryMessages.SendMessage(senderId, finalRecipientId, message, sentAt)

console.log(messageItem)
    return messageItem;
}

export default { SendMessage };
