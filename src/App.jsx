
import './App.css'
import Navbar from './components/navbar'
import {Routes , Route} from "react-router-dom"
import Home from "./pages/home"
import Chat_box from './pages/chatbot'
import Dashboard from './pages/user_dashboard1'
import AdminDashboard from './pages/admin.jsx'


const  App =() =>{
 

  return (
    <>

    <Routes>
      <Route path='/' element={ <Navbar/>}>
          <Route index element={<Home/>}/>
          <Route path='/chatbot' element={<Chat_box/>}/>
      </Route>

        <Route path='/user_dashboard1' element={<Dashboard/>}/>
        <Route path='/admin' element={<AdminDashboard/>}/>
    </Routes>
     
    </>
  )
}

export default App
