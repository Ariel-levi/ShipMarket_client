import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet } from "../services/apiService";
import { STORE_SHORT_IDS } from "../services/localService";

function AuthStoreAdminComp(props) {
  const nav = useNavigate();

  useEffect(() => {
    // check if there token in the browser
    if (localStorage["tok"]) {
      doApi();
    } else {
      toast.error("You must be admin to be here! or you need to login again");
      nav("/admin");
    }
  }, []);

  const doApi = async () => {
    let url = API_URL + "/users/myInfo";
    try {
      let resp = await doApiGet(url);
      // console.log(resp.data);
      // check if the token is of store_admin
      if (!resp.data) {
        toast.error(
          "Please login first"
        );
        nav("/");
    }
    //verify that users own this store 
    else if(localStorage[STORE_SHORT_IDS]){
        if(!JSON.parse(localStorage[STORE_SHORT_IDS]).includes(props.store_short_id)){
            toast.error("you don't own this store")
            nav("/");
          }
      }
    } 
    catch (err) {
      // if there not token at all
      console.log(err.response);
      alert("You must be admin to be here! or you need to login again");
      nav("/admin/logout");
      // if token invalid for super_admin
    }
  };
  return <React.Fragment></React.Fragment>;
}

export default AuthStoreAdminComp;
