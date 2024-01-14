import React from 'react'
import { createContext,useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) => {
    const [authState,setAuthState] = useState({isAuth: false,token: null});

    const login=(token)=>{
        setAuthState({isAuth: true,token: token})
    }

    const logout=()=>{
        setAuthState({isAuth: false,token:null})
    }

  return (
    
    <div>
    <AuthContext.Provider value={{ authState, login, logout }}>
      {children}
    </AuthContext.Provider>
  </div>
    
  )
}

export default AuthContextProvider
