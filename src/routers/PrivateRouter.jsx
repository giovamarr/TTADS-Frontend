import React from "react"
import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
    const { isAuthenticate } = useAuth()
    try{
    const auth = isAuthenticate()
    return  auth ? children : <Navigate to="/login" /> 
}
    catch(err){
        console.log(err)
        return <Navigate to="/login" />
    }
};

export default PrivateRoute;
