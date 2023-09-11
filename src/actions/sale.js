import { getCall, postCall } from "../utils/calls.js";

export const loadSalesUser = async () => {
  try{
    const result = await getCall("/sale/user");
    return result.json();
}catch(err){
    console.log(err)
};  
}

export const createSale = async (data) => {
  try{
    const result = await postCall("/sale", {"products": data});
    return result;
}catch(err){
    console.log(err);
};  
}