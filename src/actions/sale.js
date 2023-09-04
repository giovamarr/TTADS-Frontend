import { url } from "../config";


export const loadSalesUser = async () => {
  const token = localStorage.getItem("jwt");
  const result = await fetch(url + "/sale/user", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,

    },
  });
  return result.json();
};



export const createSale = async (data) => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/sale", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify( {"products": data})
    });
    return result;
  };