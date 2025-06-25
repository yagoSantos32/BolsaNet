import { execute } from "../database/conn.js"; 

async function List(){
    let sql = `SELECT * FROM users ORDER BY idUser DESC`;
    const users = await execute(sql,[]);
    return users;
}

async function Register(fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status){
    let sql = `insert into users(fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status) values( ?,?,?,?,?,?,?,?,?,?,?,?);
    SELECT idUser, admin FROM users WHERE idUser = LAST_INSERT_ID()
`;
    const registerUsers = await execute(sql,[fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status]);
  
    return registerUsers[1][0];
}


export default {List,Register}