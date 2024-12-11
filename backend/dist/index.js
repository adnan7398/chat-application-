"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let usercount = 0;
let allsocket = [];
//creating a global socket array 
wss.on("connection", (socket) => {
    // whenever a user is connected push that socket to that array 
    allsocket.push(socket);
    usercount = usercount + 1;
    console.log("user connected #" + usercount);
    socket.on("message", (message) => {
        console.log("message recieved " + message.toString());
        setTimeout(() => {
            for (let i = 0; i < allsocket.length; i++) {
                const s = allsocket[i];
                s.send(message.toString() + " sent from the server");
            }
        }, 1000);
    });
});
