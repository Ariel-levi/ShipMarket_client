import React, { useState, useEffect } from "react";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import LottieAnimation from "../../comps/general_comps/lottieAnimation";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { BsPen, BsEraser } from "react-icons/bs";
import { MdAddBusiness } from "react-icons/md";
import { toast } from "react-toastify";
import PageLinks from "../../misc_comps/pageLinks";

function StoresAdmin(props) {
  let [ar, setAr] = useState([]);
  let [ownerAr, setOwnerAr] = useState([]);
  let [numPage, setPageNum] = useState(1);
  let [status, setStatus] = useState("");
  let nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    doApi();
  }, [location, status]);

  const doApi = async () => {
    // get stores page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let url = API_URL + "/stores?page=" + pageQuery +"&status=" + status;
    try {
      let resp = await doApiGet(url);
      setAr(resp.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }

    // get owner name
    let ownerUrl = API_URL + "/users/usersList";
    try {
      let resp = await doApiGet(ownerUrl);
      let temp_ar = resp.data.map((item) => {
        return { _id: item._id, name: item.name, email: item.email };
      });
      setOwnerAr(temp_ar);
      // console.log(temp_ar);
    } catch (err) {
      alert("there problem come back later");
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

  const delStore = async (_idDel) => {
    if (window.confirm("Are you sure you want to delete?")) {
      try {
        let url = API_URL + "/stores/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        // console.log(resp.data);
        if (resp.data.deletedCount) {
          toast.info("Stores delted !");
        }
        // to show the new list without the Store that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };

  const updateStatus = async(_id) => { 
    let url = API_URL + "/stores/updateStatus/" + _id
    let resp = await doApiMethod(url,"PATCH", {});
    toast.info("store " + resp.data.status)
    doApi()
  }

  return (
    <div className="container">
      <AuthAdminComp />
      <h1>Stores in system</h1>
      <Link className="btn btn-outline-success" to="/admin/addStore">
        Add Store <MdAddBusiness />
      </Link>
      <button className="btn btn-outline-primary" onClick={() =>setStatus("")}>All stores</button>
      <button className="btn btn-outline-primary" onClick={() =>setStatus("active")}>Active</button>
      <button className="btn btn-outline-primary" onClick={() =>setStatus("pending")}>Pending</button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Owner</th>
            <th>Image</th>
            <th>Short_id</th>
            <th>status</th>
            <th>Del/Edit</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item, i) => {
            return (
              <tr key={item._id}>
                <td>{i + 1 + 5 * (numPage - 1)}</td>
                <td>{item.name}</td>
                <td>
                  {ownerAr.map((owner) => {
                    return owner._id == item.admin_id ? owner.email : "";
                  })}
                </td>
                <td>
                  <img
                    src={item.img_url || "/images/no_image.png"}
                    alt={item.name + " image"}
                    height="50"
                    width="90"
                  />
                </td>
                <td>{item.short_id}</td>
                <td><button onClick={()=>updateStatus(item._id)} className="btn btn-primary">{item.status}</button></td>
                <td>
                  <button
                    onClick={() => {
                      delStore(item._id);
                    }}
                    className="btn btn-outline-danger mx-2"
                    title="Delete"
                  >
                    <BsEraser />
                  </button>
                  <button
                    onClick={() => {
                      nav("/admin/editStore/" + item._id);
                    }}
                    className="btn btn-outline-secondary"
                    title="Edit"
                  >
                    <BsPen />
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PageLinks
        perPage="5"
        apiUrlAmount={API_URL + "/stores/amount?status=" + status}
        urlLinkTo={"/admin/stores"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
      {ar.length === 0 ? <LottieAnimation /> : ""}
    </div>
  );
}

export default StoresAdmin;
