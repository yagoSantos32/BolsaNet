import express from 'express';
import http from 'http'
import { Server } from 'socket.io'
import cors from 'cors';
import router from "./routes.js"
import dotenv from "dotenv";
import socketHandler from './sockets/socket.js';
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",

    }
});

app.use(express.json());
app.use(cors());
app.use(router);

socketHandler(io)

server.listen(process.env.PORT, () => {
    console.log('server is running'
        
    );
});