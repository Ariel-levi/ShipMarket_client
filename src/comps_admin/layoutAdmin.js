import React from "react";
import { Outlet } from "react-router-dom";
import AuthComp from "../misc_comps/authAdminComp";
import HeaderAdmin from "./headerAdmin";

function LayoutAdmin(props) {
  return (
    <div>
      <React.Fragment>
        <HeaderAdmin />
        <Outlet />
      </React.Fragment>
    </div>
  );
}

export default LayoutAdmin;
