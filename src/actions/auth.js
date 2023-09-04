import { url } from "../config";

export const login = async (data) => {
  try{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data)
    };

    const result = await fetch(url + "/login", requestOptions);
    return result;
  }catch(err){
    console.log(err)
  };  
}

export const register = async (data) => {  
  try{
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify( data)
    };

    const result = await fetch(url + "/register", requestOptions);
    return result;
  }catch(err){
    console.log(err)
  };  
}

export const getRole = async () => {  
  try{
    const token = localStorage.getItem("jwt");
    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    };
    const result = await fetch(url + "/role", requestOptions);
    return result;
  }catch(err){
    console.log(err)
  };  
}

