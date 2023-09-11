import { URL } from "../config";

export const getCall = async (subDirectory) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(URL + subDirectory, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      return result;
  };
  
  export const postCall = async (subDirectory, data) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(URL + subDirectory, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( data)
      });
      return result;
  
  };
  
  export const putCall = async (subDirectory, data) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(URL + subDirectory + data.id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify( data)
      });
      return result;
  };
  
  export const deleteCall = async (subDirectory) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(URL + subDirectory, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      return result;
  };