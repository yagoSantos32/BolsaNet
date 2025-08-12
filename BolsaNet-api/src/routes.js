import { Router } from "express";
import path from 'path';

import controllerUsers from "./controllers/controller.users.js";
import controllerMessage from "./controllers/controller.messages.js";
import jwt from "./token.js";
const router = Router();

//rotas para controle de usuario
router.get('/users', jwt.ValidateJWT,jwt.onlyAdmin, controllerUsers.List);
router.post('/user/login',controllerUsers.Login);
router.post('/user/register',controllerUsers.Register);

//rotas para controle de mensagens
router.post('/message', jwt.ValidateJWT,controllerMessage.SendMessage)
router.get('/message/conversations', jwt.ValidateJWT,controllerMessage.ListConversationByUser)


// teste de velocidade de internet
router.get('/speedtest', (req, res) => {
  const filePath = path.resolve('./public/SpeedMeter/2MB.dat');
 console.log('Enviando arquivo:', filePath);
  res.sendFile(filePath, err => {
    if (err) {
      console.error('Erro ao enviar arquivo:', err);
      if (!res.headersSent) {
        res.status(500).send('Erro ao enviar arquivo');
      }
    }
  });
});

export default router;