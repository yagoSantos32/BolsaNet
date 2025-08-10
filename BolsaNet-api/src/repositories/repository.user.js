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
    SELECT iduser, admin FROM users WHERE iduser = LAST_INSERT_ID()
`;
    const registerUser = await execute(sql, [fullName, email, password, cpf, cep, city, uf, district, street, number, admin, status]);

    return registerUser[1][0];
}

async function List() {
    let sql = `SELECT * FROM users ORDER BY iduser DESC`;
    const users = await execute(sql, []);
    return users;
}

async function ListByEmail(email) {
    let sql = `SELECT iduser,fullName,email,password,cep,city,uf,district,admin
    FROM users WHERE email = ?`;

    const user = await execute(sql, [email]);

    if (!user || user.length === 0) {
       
        return null;
    }
    return user[0];

}

async function getRandomAdminId() {
    let sql = `
    SELECT iduser FROM users WHERE admin = 1
    `
    const admins = await execute(sql,[]);
    if (!admins || admins.length === 0) {

        throw new Error("Nenhum administrador disponível");
    }

    const randomIndex = Math.floor(Math.random() * admins.length);
   
    return admins[randomIndex].iduser;
}





export default { Register, List, ListByEmail, getRandomAdminId }