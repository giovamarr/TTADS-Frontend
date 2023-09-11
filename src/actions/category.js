import { deleteCall, getCall, postCall, putCall } from "../utils/calls.js";

export const loadCategories = async () => {
  try{
    const result = await getCall("/category");
    return result.json();
  }catch(err){
    console.log(err);
  };  
  }

export const addCategory = async (data) => {
  try{
  const result = await postCall("/category", data);
  return result;
}catch(err){
  console.log(err);
};  
}

export const editCategory = async (data) => {
  try{
  const result = await putCall("/category/"+ data.id, data);
  return result;
}catch(err){
  console.log(err);
};  
}


export const deleteCategory = async (id) => {
  try{
  const result = await deleteCall("/category/" + id);
  return result;
}catch(err){
  console.log(err);
};
}  