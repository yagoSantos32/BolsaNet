import express from 'express';
import cors from 'cors';
import router from "./routes.js"

import dotenv from "dotenv";
dotenv.config(); 

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);

app.listen(process.env.PORT, ()=> {
    console.log({resposta:"sucesso"});
});