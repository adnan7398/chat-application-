
import './app.css'
// more elegant useSocket hook ;
// persistent connnecttion 

export function App() {
  return (
    <div className=' h-screen bg-black' >
      <div className="h-[90vh] bg-red-300"></div>
      <div className='w-full bg-white flex'>
        <input className=" rounded flex-1 p-4" name="" id="" />
        <button className='bg-purple-600 rounded-md text-white p-4' > send Message </button>
      </div>
    </div>
  )
}
export default App

// heartbeating ping pong means u are tlling server i am alive 