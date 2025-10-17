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

  const sql = `
    SELECT m.*, u.fullName AS senderName
    FROM supportmessages m
    JOIN users u ON m.senderId = u.iduser
    WHERE m.senderId = ? OR m.recipientId = ?
    ORDER BY m.sentAt ASC;
  `;
  const ConversationByUser = await execute(sql, [iduser, iduser]);

  return ConversationByUser

}


async function getLastMessageByUser(iduser) {
  const sql = `
    SELECT * FROM supportmessages 
    WHERE senderId = ? OR recipientId = ?
    ORDER BY sentAt DESC LIMIT 1
  `;

  const lastMessageByUser = await execute(sql, [iduser, iduser]);

  return lastMessageByUser[0]
}

export default { SendMessage, ListConversationByUser, getLastMessageByUser }