import { getCall } from "../utils/calls.js";
import { URL } from "../config";

export const login = async (data) => {
  try{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data)
    };
    const result = await fetch(URL + "/login", requestOptions);
    return result;
  }catch(err){
    console.log(err);
  };  
}

export const register = async (data) => {  
  try{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data)
    };
    const result = await fetch(URL + "/register", requestOptions);
    return result;
  }catch(err){
    console.log(err);
  };  
}

export const getRole = async () => {  
  try{
    const result = await getCall("/role")
    return result;
  }catch(err){
    console.log(err);
  };
}

