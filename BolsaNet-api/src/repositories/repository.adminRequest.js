import { execute } from "../database/conn.js";

async function RegisterRequest(iduser, status, requestedAt, reviewedAt, reviewedBy) {
    let sql = `INSERT INTO adminrequests (
    iduser,status,requestedAt,reviewedAt,reviewedBy
) VALUES (
     ?,?,?,?,?
   
);
    SELECT iduser,status,requestedAt,reviewedAt,reviewedBy FROM adminrequests WHERE id = LAST_INSERT_ID()
`;
    const registerRequest = await execute(sql, [iduser, status, requestedAt, reviewedAt, reviewedBy]);
    return registerRequest[1][0];
}


async function UpdateRequest(iduser, status, reviewedAt, idAdmin) {
  
     const sql = `
    UPDATE adminrequests
    SET status = ?, reviewedAt = ?, reviewedBy = ?
    WHERE iduser = ?
  `;
 
    const updatedUser = await execute(sql,[status, reviewedAt, idAdmin, iduser])
    return updatedUser
};
export default { RegisterRequest, UpdateRequest }