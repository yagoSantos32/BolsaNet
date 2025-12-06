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
  
     let sql = `
    UPDATE adminrequests
    SET status = ?, reviewedAt = ?, reviewedBy = ?
    WHERE iduser = ?
  `;
 
    const updatedUser = await execute(sql,[status, reviewedAt, idAdmin, iduser])
    return updatedUser
};

async function List(filters) {
    let sql = `
        SELECT ar.*, u.fullName, u.email, u.cep, u.city, u.uf, u.district, u.street, u.number
        FROM adminrequests ar
        LEFT JOIN users u ON ar.iduser = u.iduser
    `;
    const params = [];
    
    if (Object.keys(filters).length > 0) {
        const conditions = Object.entries(filters).map(([field, value]) => {
            params.push(value);
            return `ar.${field} = ?`;
        });
        sql += ` WHERE ` + conditions.join(' AND ');
    }
    
    sql += ` ORDER BY ar.iduser DESC`;
    
    console.log('🔍 SQL:', sql);
    console.log('📊 Params:', params);
    
    const requests = await execute(sql, params);
    return requests;
}

export default { RegisterRequest, UpdateRequest,List }