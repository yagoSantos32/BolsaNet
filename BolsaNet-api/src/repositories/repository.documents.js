import { execute } from "../database/conn.js";

async function RegisterDocuments(userId,fieldname, filePath, status, notes, uploadedAt, reviewedAt, reviewedBy) {
    let sql = `INSERT INTO documents(userId,fieldname,  filePath, status, notes, uploadedAt, reviewedAt, reviewedBy) 
     VALUES(?, ?, ?, ?, ?, ?, ?, ?);

      SELECT userId,  filePath, status, notes, uploadedAt, reviewedAt, reviewedBy FROM documents 
      WHERE idDocuments = LAST_INSERT_ID()
    `

    const RegisterDocuments = await execute(sql, [userId,fieldname,  filePath, status, notes, uploadedAt, 
    reviewedAt, reviewedBy])

    return RegisterDocuments[1][0];
}

export default {RegisterDocuments}
