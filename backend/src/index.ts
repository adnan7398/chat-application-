import {WebSocketServer,WebSocket} from "ws";

const wss  = new WebSocketServer({port:8080});

let usercount = 0 ;
let allsocket:WebSocket[]= [];
//creating a global socket array 
wss.on("connection",(socket)=>{
    // whenever a user is connected push that socket to that array 
    allsocket.push(socket);
    usercount = usercount+1;
    console.log("user connected #" +usercount );
    socket.on("message",(message)=>{
        console.log("message recieved " + message.toString())
        setTimeout(()=>{
            for(let i = 0;i<allsocket.length;i++){
                const s = allsocket[i];
                s.send(message.toString() + " sent from the server")
            }
        },1000)
    })
})