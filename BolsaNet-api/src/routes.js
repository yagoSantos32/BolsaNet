import { Router } from "express";
import path from 'path';
import { storage } from "./multer.config.js";
import controllerUsers from "./controllers/controller.users.js";
import controllerMessage from "./controllers/controller.messages.js";
import controllerDocuments from "./controllers/controller.documents.js";
import controllerAdminRequest from "./controllers/controller.adminRequest.js";
import controllerBenefitPeriod from "./controllers/controller.benefitPeriod.js";
import controllerStudentPerformance from "./controllers/controller.studentPerformance.js"; 
import jwt from "./token.js";
import multer from "multer";

const router = Router();
const uploads = multer({ storage: storage })

// rota apenas para verificar a validade do token no front 
router.get('/validateJWT', jwt.ValidateJWT, (req, res) => {
    res.json({ valid: true, userId: req.userId });
});
// rota apenas para o front verificar se o usuário é admin
router.get('/validateAdmin', jwt.ValidateJWT, jwt.onlyAdmin, (req, res) => {
    res.json({ valid: true, userId: req.userId, admin: req.admin });
});

//rotas para controle de usuario
router.get('/users', jwt.ValidateJWT, jwt.onlyAdmin, controllerUsers.List);
router.post('/user/register', controllerUsers.Register);
router.post('/user/login', controllerUsers.Login);
router.put('/user/:iduser', jwt.ValidateJWT,jwt.onlyAdmin, controllerUsers.UpdateUser)
router.delete('/user/:iduser',jwt.ValidateJWT,jwt.onlyAdmin,controllerUsers.DeleteUser)

//rotas para controle de administradores 
router.get('/adminrequest',jwt.ValidateJWT,jwt.onlyAdmin,controllerAdminRequest.List)
router.post('/adminrequest/register', jwt.ValidateJWT,controllerAdminRequest.RegisterRequest);
router.put('/adminrequest/:iduser', jwt.ValidateJWT,jwt.onlyAdmin, controllerAdminRequest.UpdateRequest)

//rotas para gerenciar o beneficio
router.post('/benefitPeriod/register',jwt.ValidateJWT,jwt.onlyAdmin,controllerBenefitPeriod.RegisterBenefitPeriod)
router.get('/benefitPeriod',jwt.ValidateJWT,controllerBenefitPeriod.ListBenefitPeriod)

// rotas performace de estudante 
router.post('/studentPerformance/register', jwt.ValidateJWT, jwt.onlyAdmin, controllerStudentPerformance.RegisterStudentPerformance);
router.get('/studentPerformance', jwt.ValidateJWT, jwt.onlyAdmin, controllerStudentPerformance.ListStudentPerformance);
router.get('/studentPerformance/user/:idusers', jwt.ValidateJWT, controllerStudentPerformance.GetStudentPerformanceByUser);
router.put('/studentPerformance/:idusers/:idyearMonth', jwt.ValidateJWT, jwt.onlyAdmin, controllerStudentPerformance.UpdateStudentPerformance);

//rotas para documentos
router.post('/documents/uploads', jwt.ValidateJWT,uploads.any(),controllerDocuments.RegisterDocuments)
router.get('/user/:userId/documents', jwt.ValidateJWT, controllerDocuments.ListUserDocuments);
router.get("/documents/download/:id",  jwt.ValidateJWT, controllerDocuments.DownloadDocument);

//rotas para controle de mensagens
router.post('/message', jwt.ValidateJWT, controllerMessage.SendMessage)
router.get('/message/conversations', jwt.ValidateJWT, controllerMessage.ListConversationByUser)

// Endpoint para teste de velocidade de internet.
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
