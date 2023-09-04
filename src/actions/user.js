import { url } from "../config";

export const loadUsers = async () => {
    const token = localStorage.getItem("jwt");
    const result = await fetch(url + "/admin/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,

      },
    });
    return result.json();
  };