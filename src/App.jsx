import React, { useContext } from 'react'
import { Route, Router, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Editior from './Pages/Editior'
import Nav from './Components/Nav/Nav'

function App() {
  
  return (
    <>
        <Nav/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/editior' element={<Editior/>}/>
      </Routes>
    </>
  )
}

export default App
