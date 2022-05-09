import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function Logout(props) {
  let nav = useNavigate();

  useEffect(() => {
    localStorage.removeItem("tok");
    toast.info("You log out from system, see you later");
    nav("/");
  }, []);

  return <div>Please wait... you log out.</div>;
}

export default Logout;
