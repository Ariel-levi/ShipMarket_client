import React from "react";
import { Outlet } from "react-router-dom";
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
