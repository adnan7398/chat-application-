"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allsocket = [];
//creating a global socket array 
wss.on("connection", (socket) => {
    // whenever a user is connected push that socket to that array 
    socket.on("message", (message) => {
        //@ts-ignore
        const parseMessage = JSON.parse(message);
        if (parseMessage.type === "join") {
            allsocket.push({
                socket,
                room: parseMessage.payload.roomId
            }); // why pushing ki currentUserRoom ka room id kya hai .
        }
        if (parseMessage.type === "chat") {
            //const currentUserRoom = allsocket.find((x)=>x.socket==socket);
            let currentUserRoom = null;
            for (let i = 0; i < allsocket.length; i++) {
                if (allsocket[i].socket == socket) {
                    currentUserRoom = allsocket[i].room;
                }
            }
            for (let i = 0; i < allsocket.length; i++) {
                if (allsocket[i].room == currentUserRoom) {
                    allsocket[i].socket.send(parseMessage.payload.message);
                }
            }
        }
    });
    socket.on("disconnect", () => {
    });
});
