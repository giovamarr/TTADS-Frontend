import { url } from "../config";


export const loadCategories = async () => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/category/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
    });
    return result.json();
  };

  export const addCategory = async (data) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/category", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( data)
    });
    return result;
  }

export const editCategory = async (data) => {
    const token = localStorage.getItem("jwt");
    console.log(data)
    const result = await fetch(url + "/category/" + data.id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( data)
    });
    return result;
  }


export const deleteCategory = async (id) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/category/" + id, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      }
    });
    console.log(result)
    return result;
  }