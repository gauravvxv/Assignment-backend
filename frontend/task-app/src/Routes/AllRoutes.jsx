import React from 'react'
import { Route,Routes } from 'react-router-dom'
import Data from '../components/Data'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Profile from '../components/Profile'
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path='/task' element={<Data/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
      </Routes>
    </div>
  )
}   
export default AllRoutes
