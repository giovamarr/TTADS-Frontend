import { url } from "../config";


export const loadProductsByCategory = async (id) => {
  const token = localStorage.getItem("jwt");
  
  const result = await fetch(url + "/product/category/"+ id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
  
      },
      method: "GET",
    });
    return result.json();
  };

export const loadOneProduct = async (id) => {
    const token = localStorage.getItem("jwt");

    const result = await fetch(url + "/product/"+ id, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
  
      },
      method: "GET",
    });
    return result.json();
  };


export const addProduct = async (data) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/product", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( data)
    });
    return result;
  }

  export const editProduct = async (data) => {
    const token = localStorage.getItem("jwt");
    console.log(data)
    const result = await fetch(url + "/product/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( data)
    });
    return result;
  }



export const deleteProduct = async (id) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/product/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(result)
    return result;
  }