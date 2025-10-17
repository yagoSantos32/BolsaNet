import repositoryUser from "../repositories/repository.user.js";
import jwt from "../token.js"

import bcrypt from "bcrypt";

async function Login(userData) {
    const { email, password } = userData
    const user = await repositoryUser.ListByEmailOrCpf(email, null);
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
    const userEmail = await repositoryUser.ListByEmailOrCpf(email, cpf);

    if (userEmail) {
        return { error: "E-mail ou cpf já cadastrado." };
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await repositoryUser.Register(fullName, email, hashPassword, cpf, cep, city, uf, district, street, number, admin, status);
    user.token = jwt.CreateJWT(user.iduser, user.admin);
    delete user.password;
    return user;
}

async function List(filters) {
    const validFilters = Object.fromEntries(
        Object.entries(filters).filter(([_, value]) => value)
    )

    const users = await repositoryUser.List(validFilters);
    return users.map(user => {
        const { password: _, ...safeUser } = user;
        return safeUser;
    });

}

async function UpdateUser(iduser, data) {
    const { status } = data
    if (!status) {
        throw new Error("O campo 'status' é obrigatório.");
    }

    const result = await repositoryUser.UpdateUser(iduser, status);
    if (result.affectedRows === 0) return null;
    return result
};

async function DeleteUser(iduser) {
    if (!iduser) {
        throw new Error("O id do usuario é obrigatório.");
    }
    const result = await repositoryUser.DeleteUser(iduser)
    if (result.affectedRows === 0) return null;
    return result
}




export default { Login, Register, List, UpdateUser, DeleteUser };


// aqui deve ser implementado as regras para o app (os if e else para deixa-lo seguro)