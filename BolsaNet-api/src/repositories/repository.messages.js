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

export default { SendMessage }