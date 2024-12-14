import {WebSocketServer,WebSocket} from "ws";

const wss  = new WebSocketServer({port:8080});

// let usercount = 0 ;
// let allsocket:WebSocket[]= [];
// //creating a global socket array 
// wss.on("connection",(socket)=>{
//     // whenever a user is connected push that socket to that array 
//     allsocket.push(socket);
//     usercount = usercount+1;
//     console.log("user connected #" +usercount );
//     socket.on("message",(message)=>{
//         console.log("message recieved " + message.toString())
//         setTimeout(()=>{
//             allsocket.forEach(s=>{
//                 s.send(message.toString() + " : sent from the server");
//             })
//         })
//         socket.on("disconnect",()=>{
//             allsocket = allsocket.filter(x=> x!= socket);
//         })
//     })
// })
interface user {
    socket:WebSocket;
    room:string;

}
let allsocket :user[]=  []
//creating a global socket array 
wss.on("connection",(socket)=>{
    // whenever a user is connected push that socket to that array 

    socket.on("message",(message)=>{
        //@ts-ignore
        const parseMessage = JSON.parse(message);

        if(parseMessage.type ==="join"){
            allsocket.push({
                socket,
                room:parseMessage.payload.roomId
            })// why pushing ki currentUserRoom ka room id kya hai .
        }
        if(parseMessage.type === "chat"){
            //const currentUserRoom = allsocket.find((x)=>x.socket==socket);
            let currentUserRoom = null;
            for(let i=0;i<allsocket.length;i++){
                if(allsocket[i].socket == socket){
                    currentUserRoom = allsocket[i].room;
                }
            }
            for(let i=0;i<allsocket.length;i++){
                if(allsocket[i].room == currentUserRoom){
                    allsocket[i].socket.send(parseMessage.payload.message);
                }
            }
        }
    })
    socket.on("disconnect",()=>{
          
        })
    
})