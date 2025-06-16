import { Router } from "express";
import controllerUser from "./controllers/controller.user.js";
import jwt from "./token.js";
const router = Router();


router.get('/user', jwt.ValidateJWT,jwt.onlyAdmin, controllerUser.List);
router.post('/user/login',controllerUser.Login);
router.post('/user/register',controllerUser.Register);
//  pedido: adiciona data de criação de cadastro no banco de dados

export default router;