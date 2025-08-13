import dotenv from "dotenv";
dotenv.config();

import jwt from "jsonwebtoken";


const secretToken = process.env.JWT_SECRET;

function CreateJWT(idUser, typeUser) {
    const token = jwt.sign({ idUser, typeUser }, secretToken, {
        expiresIn: "2 days"
    });

    return token;

};

function ValidateJWT(req, res, next) {
    const authToken = req.headers.authorization;

    if (!authToken) {
        return res.status(401).json({ error: "Token não informado" })
    }
    const [aux, token] = authToken.split(" ");

    jwt.verify(token, secretToken, (err, decoded) => {
        if (err) {
            return res.status(401).json({ error: "Token inavalido" });
        }
        // salva id dentro da requisição

        req.idUser = decoded.idUser;
        req.typeUser = decoded.typeUser;
        next();
    });
}

export function ValidateJWTSocket(token) {
    if (!token) throw new Error("Token não informado");

   
    const decoded = jwt.verify(token, secretToken);

    return {
        idUser: decoded.idUser,
        typeUser: decoded.typeUser
    };
}
function onlyAdmin(req, res, next) {

    if (req.typeUser !== 1) {
        return res.status(403).json({ error: "Acesso restrito a administradores" });
    }
    next();

}
// ----> routes ----> validar token -----> controller---> resposta 

export default { CreateJWT, ValidateJWT, ValidateJWTSocket, onlyAdmin };