import { Router } from "express";
import controllerUsers from "./controllers/controller.users.js";
import jwt from "./token.js";
const router = Router();


router.get('/users', jwt.ValidateJWT,jwt.onlyAdmin, controllerUsers.List);
router.post('/user/login',controllerUsers.Login);
router.post('/user/register',controllerUsers.Register);
//  pedido: adiciona data de criação de cadastro no banco de dados

export default router;