import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
const app = express();
const isDev = app.settings.env === "development";
const url = isDev ? "http://localhost:3000" : "https://sketch-book-3wx1a6twa-suraj-dhankad2025.vercel.app";
app.use(cors({origin: 'http://localhost:3000'}));
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: 'http://localhost:3000' });

io.on("connection", (socket) => {
  console.log("server connected");
  socket.on('beginPath', (arg)=>{
    socket.broadcast.emit('beginPath', arg);
  })
  socket.on('drawLine', (arg)=>{
    socket.broadcast.emit('drawLine', arg);
  })
  socket.on('changeConfig', (arg)=>{
    socket.broadcast.emit('changeConfig', arg);
  })
});

httpServer.listen(5001);