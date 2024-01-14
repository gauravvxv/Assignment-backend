import React, { useState } from 'react'
import { Route,Routes } from 'react-router-dom'
import Data from '../components/Data'
import Signup from '../components/Signup'
import Login from '../components/Login'
import Profile from '../components/Profile'
import PrivateRoute from './PrivateRoute'
const AllRoutes = () => {
  return (
    <div>
      <Routes>
      <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/login' element={<Login/>}></Route>

        <Route path='/task' element={
          <PrivateRoute>
        <Data/>
        </PrivateRoute>
      }>
        </Route>

        <Route path='/profile/:userId' element={<Profile/>}>

        </Route>

      </Routes>
    </div>
  )
}   
export default AllRoutes
