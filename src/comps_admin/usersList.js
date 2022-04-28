import React, { useEffect, useState, useRef } from "react";
import AuthAdminComp from "../misc_comps/authAdminComp";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";
import { MdOutlineDeliveryDining, MdAdminPanelSettings } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import { BsShop, BsEraser } from "react-icons/bs";
import LottieAnimation from "../comps/general_comps/lottieAnimation";
import PageLinks from "../misc_comps/pageLinks";
import { useLocation } from "react-router-dom";

function UsersList(props) {
  let [ar, setAr] = useState([]);
  let selectRef = useRef();
  let [numPage, setPageNum] = useState(1);
  const location = useLocation();

  useEffect(() => {
    doApi();
  }, [location]);

  const doApi = async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + "/users/usersList?page=" + pageQuery;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delUser = async (_idDel) => {
    // del user
    if (window.confirm("Are you sure you want to delete the user?")) {
      let url = API_URL + `/users/delete/${_idDel}`;
      try {
        let resp = await doApiMethod(url, "DELETE", {});
        if (resp.data.deletedCount) {
          doApi();
        }
      } catch (err) {
        alert("There was a problem with deleting the user ");
        if (err.response) {
          console.log(err.response.data);
        }
      }
    }
  };

  // change role user for admin or back to regular user
  const changeRole = async (_userId) => {
    let role = selectRef.current.value;
    let url = API_URL + `/users/changeRole/${_userId}/${role}`;
    try {
      let resp = await doApiMethod(url, "PATCH", {});
      if (resp.data.modifiedCount) {
        doApi();
      }
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <h1>List of Users in system</h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>name</th>
            <th>email</th>
            <th>address</th>
            <th>role</th>
            <th>del</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1 + 10 * (numPage - 1)}</td>
                <td>
                  {item.role === "super_admin" ? <MdAdminPanelSettings /> : ""}
                  {item.role === "admin" ? <BsShop /> : ""}
                  {item.role === "deliver" ? <MdOutlineDeliveryDining /> : ""}
                  {item.role === "user" ? <FaUserAlt /> : ""}
                  {" " + item.name}
                </td>
                <td>{item.email}</td>
                <td>{item.address}</td>
                <td className="d-flex justify-content-center">
                  <select
                    ref={selectRef}
                    defaultValue={item.role}
                    onChange={() => {
                      changeRole(item._id);
                    }}
                    className="form-select"
                  >
                    <option value="super_admin">Super Admin</option>
                    <option value="admin">Admin</option>
                    <option value="deliver">Deliver</option>
                    <option value="user">User</option>
                  </select>
                </td>
                <td>
                  <button
                    onClick={() => {
                      delUser(item._id);
                    }}
                    className="btn btn-outline-danger mx-2"
                    title="Delete"
                  >
                    <BsEraser />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PageLinks
        perPage="10"
        apiUrlAmount={API_URL + "/users/amount"}
        urlLinkTo={"/admin/users"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
      {ar.length === 0 ? <LottieAnimation /> : ""}
    </div>
  );
}

export default UsersList;
