import React from "react";
import "./css/register.css";
import { API_URL, doApiMethod } from './../services/apiService';
import { toast } from "react-toastify";
import AuthClientComp from "./general_comps/authClientComp";
function ApplyingDriverForm(props) {
  <AuthClientComp/>
  
const onClickApply = async() => { 
  let url = API_URL + "/users/applyingForDelivery"
  try {
    let resp = await doApiMethod(url, "PATCH", {});
    console.log(resp);
    if(resp.data.modifiedCount ===1){
      toast.success("your applied successfully")
    }
    else{
      toast.error("you already applied")
    }
  } catch (error) {
    console.log(error);
    toast.error("something went wrong")
  }
}
  return (
    <div className="container col-md-6 text-center border shadow p-4 mt-3">
      <h3 className="mb-3">Become a Shipmarket driver partner</h3>
        <h6>Ready to become a Shipmarket driver and get started? apply in a few clicks.</h6>
        <botton className="btn btn-info" onClick={onClickApply}>Apply</botton>
    
        
    </div>
  );
}

export default ApplyingDriverForm