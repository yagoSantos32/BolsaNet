import { execute } from "../database/conn.js";

async function Register(fullName, email, password, cpf, cep, city, uf, district, street, number, admin, status) {
    let sql = `INSERT INTO users (
    fullName,
    email,
    password,
    cpf,
    cep,
    city,
    uf,
    district,
    street,
    number,
    admin,
    status
) VALUES (
     ?,?,?,?,?,?,?,?,?,?,?,?
   
);
    SELECT iduser,fullName,email,password,cep,city,uf, admin FROM users WHERE iduser = LAST_INSERT_ID()
`;
    const registerUser = await execute(sql, [fullName, email, password, cpf, cep, city, uf, district, street, number, admin, status]);

    return registerUser[1][0];
}

async function List(filters) {
    let sql = `SELECT * FROM users WHERE admin=0 `;
    const params = [];
    const conditions = Object.entries(filters).map(([field, value]) => {
        params.push(value)
        return `${field} = ?`
    })

    if (conditions.length > 0) {
        sql += `AND `+ conditions.join(' AND ')
    }

    sql += ` ORDER BY iduser DESC`;

    console.log(sql)
    const users = await execute(sql, params);
    return users;
}


async function ListByEmailOrCpf(email, cpf) {
    let sql = `
      SELECT iduser, fullName, email,password, cep, city, uf, admin
      FROM users 
      WHERE email = ?
    `;
    const params = [email];

    if (cpf) {
        sql += " OR cpf = ?";
        params.push(cpf);
    }

    const user = await execute(sql, params);
    return user[0]
}

async function getRandomAdminId() {
    let sql = `
    SELECT iduser FROM users WHERE admin = 1
    `
    const admins = await execute(sql, []);
    if (!admins || admins.length === 0) {

        throw new Error("Nenhum administrador disponível");
    }

    const randomIndex = Math.floor(Math.random() * admins.length);

    return admins[randomIndex].iduser;
}

async function UpdateUser(iduser, status) {
    let sql = `UPDATE users SET status = ? WHERE iduser = ?`
    const updatedUser = await execute(sql, [status, iduser])
    return updatedUser
};

async function DeleteUser(iduser) {
    const sql = "DELETE FROM users WHERE iduser = ?";
    const result = await execute(sql, [iduser]);
    return result;
}





export default { Register, List, ListByEmailOrCpf, getRandomAdminId, UpdateUser,DeleteUser }