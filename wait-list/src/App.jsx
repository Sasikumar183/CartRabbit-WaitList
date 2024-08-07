import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './assets/components/Login';
import Signup from './assets/components/Signup';
import AdminLogin from './assets/components/AdminLogin';
import { Home } from './assets/components/Home';
import { AdminHome } from './assets/components/AdminHome';
import AddUser from './assets/components/AddUser';
import { EditUser } from './assets/components/EditUser';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/admin' element={<AdminLogin/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/adminhome' element={<AdminHome/>}/>
          <Route path='/adduser' element={<AddUser/>}/>
          <Route path='/adminhome/edituser/:id' element={<EditUser/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
