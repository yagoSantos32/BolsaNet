import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import router from "./routes.js";
import dotenv from "dotenv";
import socketHandler from './sockets/socket.js';
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    }
});


app.use(express.json());
app.use(cors());



app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));


app.use(router);


socketHandler(io);

server.listen(process.env.PORT, () => {
    console.log(`server is running: ${process.env.PORT}`);
    console.log("Pasta uploads servida em /uploads");
});
