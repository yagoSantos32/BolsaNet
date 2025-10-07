import repositoryUser from "../repositories/repository.user.js";
import jwt from "../token.js"

import bcrypt from "bcrypt";

async function Login(userData) {
    const { email, password } = userData
    const user = await repositoryUser.ListByEmailOrCpf(email,null);
    if (!user || user.length == 0) {
        return [];
    }
    else {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            user.token = jwt.CreateJWT(user.iduser, user.admin);
            delete user.admin;
            return user;
        }
        else {
            return [];  
        }
    }
}

async function Register(userData) {
   
    const [{ fullName, email, password, cpf, cep, city, uf, district, street, number, admin, status }] = userData
    const userEmail = await repositoryUser.ListByEmailOrCpf(email,cpf);

    if (userEmail) {
        return { error: "E-mail ou cpf já cadastrado." };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repositoryUser.Register(fullName, email, hashPassword, cpf, cep, city, uf, district, street, number, admin, status);
    user.token = jwt.CreateJWT(user.iduser, user.admin);
    delete user.password;
    return user;
}

async function List() {
    const users = await repositoryUser.List();
    return users.map(user => {
        const { password: _, ...safeUser } = user;
        return safeUser;
    });

}


export default { Login, Register, List };


// aqui deve ser implementado as regras para o app (os if e else para deixa-lo seguro)