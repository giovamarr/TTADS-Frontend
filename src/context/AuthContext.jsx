import React, { createContext, useContext, useState } from "react"
import { getRole } from '../actions/auth.js';

const AuthContext = createContext()

export const useAuth = ()  =>{
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) =>{
  const [currentUser, setCurrentUser] = useState()
  const [role, setRole] = useState("");


  async function loginUser(token){
    localStorage.setItem("jwt", token);
    setCurrentUser(token)
    const result = await getRole();
    if (!result.ok){
      setRole('client')
    }else{
      const res = await result.json()
      setRole(res["role"])
    }
  }

  const logout = () => {
    setCurrentUser();
    localStorage.removeItem("jwt");
  };

  async function isAuth () {
    if (currentUser){
      return true
    }
    const token = localStorage.getItem("jwt");
    if (token){
      localStorage.setItem("jwt", token);
      setCurrentUser(token)
      if (!role){
        const result = await getRole();
        if (!result.ok){
          setRole('client')
        }else{
          const res = await result.json()
          setRole(res["role"])
        }
      }
      return true
    }
    return false
  }

  return (
    <AuthContext.Provider value={{isAuth, currentUser, loginUser, logout, role }}>
      { children}
    </AuthContext.Provider>
  )
}