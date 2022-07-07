import React from 'react'
import { BrowserRouter as Router, Switch, Route, Routes } from 'react-router-dom';

import Home from "./components/Home"
import Navbar from "./components/Navbar"
import Book from "./components/Book"
import Login from "./components/Login"
import Register from "./components/Register"
import UserDetails from "./components/UserDetails"


const App= () => {
  return(
    <>
      <Navbar/>
      <Routes>
        <Route exact path="/" element={<Home/>}></Route>
        <Route exact path="/book" element={<Book/>}></Route>
        <Route exact path="/login" element={<Login/>}></Route>
        <Route exact path="/register" element={<Register/>}></Route>
        <Route exact path="/userdetails" element={<UserDetails/>}></Route>
      </Routes>
      
    </>
  )
}

export default App