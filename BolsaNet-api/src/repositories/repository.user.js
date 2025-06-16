import { execute } from "../database/conn.js"; 

async function List(){
    let sql = `SELECT * FROM user `;
    const users = await execute(sql,[]);
    return users;
}

async function Register(fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status){
    let sql = `insert into user(fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status) values( ?,?,?,?,?,?,?,?,?,?,?,?);
    SELECT idUser,admin FROM user
    ORDER BY idUser DESC LIMIT 1`;
    const registerUser = await execute(sql,[fullName,email,pass,CPF,CEP,city,UF,district,street,number,admin,status]);
  
    return registerUser[1][0];
}


export default {List,Register}