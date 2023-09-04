import React from "react"
import { Navigate } from "react-router"
import { useAuth } from "../context/AuthContext"

const PrivateRoute = ({ children }) => {
    const { isAuth } = useAuth()
    const auth = isAuth()
    return  auth ? children : <Navigate to="/login" /> 
};

export default PrivateRoute;
