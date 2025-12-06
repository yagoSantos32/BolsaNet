import { execute } from "../database/conn.js"

async function SendMessage(senderId, recipientId, message, sentAt) {
  let sql = `
    INSERT INTO supportmessages (senderId, recipientId, message, sentAt)
    VALUES (?, ?,?, ?);
    SELECT idMessage, senderId, recipientId, message, sentAt from supportmessages WHERE idMessage = LAST_INSERT_ID()
    `

  const SendMessages = await execute(sql, [senderId, recipientId, message, sentAt]);

  return SendMessages[1][0]
}

async function ListConversationByUser(iduser) {

  let sql = `
   SELECT 
    m.*, 
    sender.fullName AS senderName,
    recipient.fullName AS recipientName
FROM supportmessages m
JOIN users sender ON sender.iduser = m.senderId
JOIN users recipient ON recipient.iduser = m.recipientId
WHERE m.senderId = ? OR m.recipientId = ?
ORDER BY m.sentAt ASC;

  `;
  const ConversationByUser = await execute(sql, [iduser, iduser]);

  return ConversationByUser

}


async function getLastMessageByUser(iduser) {
  let sql = `
    SELECT * FROM supportmessages 
    WHERE senderId = ? OR recipientId = ?
    ORDER BY sentAt DESC LIMIT 1
  `;

  const lastMessageByUser = await execute(sql, [iduser, iduser]);

  return lastMessageByUser[0]
}

export default { SendMessage, ListConversationByUser, getLastMessageByUser }