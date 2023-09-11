import { deleteCall, getCall, postCall, putCall } from "../utils/calls.js";

export const loadProductsByCategory = async (id) => {
  try{
    const result = await getCall("/product/category/"+ id);
    return result.json();
  }catch(err){
  console.log(err)
}
  };

export const loadOneProduct = async (id) => {
  try{
    const result = await getCall("/product/"+ id);
    return result.json();
  }catch(err){
    console.log(err)
  };
  }

export const addProduct = async (data) => {
  try{
    const result = await postCall("/product", data);
    return result;
}catch(err){
    console.log(err);
};  
}

export const editProduct = async (data) => {
  try{
    const result = await putCall("/product/" + data.id, data);
    return result;
}catch(err){
    console.log(err);
};  
}

export const deleteProduct = async (id) => {
  try{
    const result = await deleteCall("/product/" + id);
    return result;
}catch(err){
  console.log(err);
};  
}
