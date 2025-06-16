import dotenv from "dotenv";
dotenv.config(); 
import mysql from "mysql2";

// Criação do pool de conexões
const MySQL = mysql;

const db = MySQL.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    multipleStatements: true


});

// Função para executar comandos no banco
function execute(command, params, method = 'query') {
    return new Promise((resolve, reject) => {
        db[method](command, params, (err, result) => {
            if (err)
                reject(err);
            else
                resolve(result);
        });
    });
}

export { db, execute };

// a função execute, da comando no banco de dados e retorna as mensagens
// Uma Promise (promessa) em JavaScript representa uma tarefa assíncrona que ainda está em execução, pode dar certo (resolve) ou pode falhar (reject).
// Ela é usada quando algo leva tempo para acontecer, como acessar um banco de dados, ler arquivos ou fazer requisições a APIs.
