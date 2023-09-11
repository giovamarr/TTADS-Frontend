import { getCall } from "../utils/calls.js";

export const loadUsers = async () => {
  try{
    const result = await getCall("/admin/user/");
    return result.json();
}catch(err){
    console.log(err)
};  
}