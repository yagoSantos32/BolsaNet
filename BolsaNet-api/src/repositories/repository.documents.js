import { execute } from "../database/conn.js";

async function RegisterDocuments(userId, fieldname, filePath, status, notes, uploadedAt, reviewedAt, reviewedBy) {
  let sql = `INSERT INTO documents(userId,fieldname,  filePath, status, notes, uploadedAt, reviewedAt, reviewedBy) 
     VALUES(?, ?, ?, ?, ?, ?, ?, ?);

      SELECT userId,  filePath, status, notes, uploadedAt, reviewedAt, reviewedBy FROM documents 
      WHERE idDocuments = LAST_INSERT_ID()
    `

  const RegisterDocuments = await execute(sql, [userId, fieldname, filePath, status, notes, uploadedAt,
    reviewedAt, reviewedBy])

  return RegisterDocuments[1][0];
}

async function ListUserDocuments(userId) {
  let sql = `SELECT fieldname,filePath,status,notes FROM documents WHERE userId = ?`

  const result = await execute(sql, [userId]);
  return result;
}

export default { RegisterDocuments, ListUserDocuments }
