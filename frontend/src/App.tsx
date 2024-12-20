
import { useEffect, useRef, useState } from 'react'
import './app.css'
// more elegant useSocket hook ;
// persistent connnecttion 

export function App() {
  const [Message,setMessage] = useState(["hi there","hello"]);
  const wsRef = useRef();
  useEffect(()=>{
    const ws = new WebSocket("http://localhost:8080");
    ws.onmessage = (event) =>{
      setMessage(m=> [...m,event.data])
    }
    wsRef.current = ws;
    ws.onopen = ()=>{
      ws.send(JSON.stringify({
        type:"join",
        payload:{
          roomId:"red"
        }
      }))
    }
    return ()=>{
      ws.close();
    }

  },[])
  return (
    <div className=' h-screen bg-black' >
      <div className="h-[90vh] bg-slate-700">
        <br /> <br />
        {Message.map(Message => <div className='m-10'> 
          <span className='bg-white text-black rounded-lg p-4 ml-4'>{Message}</span>
        </div>)}
      </div>
      <div className='w-full bg-white flex'>
        <input className=" rounded flex-1 p-4" name="" id="message" /> 
        <button onClick={()=>{
          const message = document.getElementById("message")?.value;
          wsRef.current.send(JSON.stringify({
            type:"chat",
            payload:{
              message:message
            }
          }))
        }} className='bg-purple-600 rounded-md text-white p-4' > send Message </button>
      </div>
    </div>
  )
}
export default App

// heartbeating ping pong means u are tlling server i am alive 