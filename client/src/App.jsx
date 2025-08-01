import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Registeration from './components/Registration'
import Login from './components/Login'
import Dashboard from './pages/Dashboard'
import AddQuestion from './pages/Admin/AddQuestion'
import QuestionPage from './pages/QuestionPage'
import Performance from './pages/Performance'
import Profile from './pages/Profile'
import AdminLogin from './pages/Admin/AdminLogin'
import { AdminDash } from './pages/Admin/AdminDash'
import { AdminSidebar } from './components/admin/AdminSidebar'
import Users from './pages/Admin/Users'
import AdminHome from './pages/Admin/AdminHome'
import About from './pages/About'
import Layout from './components/Layout'

const App = () => {
  return (
    <>
       <Routes>
        
       
        <Route path="/register" element={<Registeration/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route element={<Layout/>}>
        <Route path="/" element={<Home/>}/>
        <Route path="/dash" element={<Dashboard/>}/>
           <Route path="/performance" element={<Performance/>}/>
       
        <Route path="/question/:category" element={<QuestionPage/>}/>
         <Route path="/about" element={<About/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Route>
        <Route path="/adminlogin" element={<AdminLogin/>}/>
        <Route path="/admindash" element={<AdminDash/>}>
        <Route path="questions" element={<AddQuestion/>}/>
          <Route index element={<AdminHome/>}/>
        <Route path='users'element={<Users/>}/>
        </Route>
        <Route path="/adminSidebar" element={<AdminSidebar/>}/>
        
       </Routes>
      
    </>
  )
}

export default App