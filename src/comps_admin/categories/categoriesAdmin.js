import React, { useState, useEffect } from "react";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import LottieAnimation from "../../comps/general_comps/lottieAnimation";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { BsPen, BsEraser } from "react-icons/bs";
import { IoDuplicateOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import PageLinks from "../../misc_comps/pageLinks";

function CategoriesAdmin(props) {
  let [ar, setAr] = useState([]);
  let [ownerAr, setOwnerAr] = useState([]);
  let [numPage, setPageNum] = useState(1);
  let nav = useNavigate();
  const location = useLocation();

  useEffect(() => {
    doApi();
  }, [location]);

  const doApi = async () => {
    // get categories page number
    const urlParams = new URLSearchParams(window.location.search);
    let pageQuery = urlParams.get("page") || 1;
    setPageNum(pageQuery);
    let urlCategory = API_URL + "/categories?page=" + pageQuery;
    let resp2 = await doApiGet(urlCategory);
    // console.log(resp2.data);
    setAr(resp2.data);

    // get Store name
    let ownerUrl = API_URL + "/stores";
    try {
      let resp = await doApiGet(ownerUrl);
      let temp_ar = resp.data.map((item) => {
        return { _id: item._id, name: item.name, short_id: item.short_id };
      });
      setOwnerAr(temp_ar);
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
        let url = API_URL + "/categories/" + _idDel;
        let resp = await doApiMethod(url, "DELETE", {});
        // console.log(resp.data);
        if (resp.data.deletedCount) {
          toast.info("Category delted !");
        }
        // to show the new list without the Category that we deleted
        doApi();
      } catch (err) {
        console.log(err.response);
        alert("there problem , try again later");
      }
    }
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <h1>Categories in system</h1>
      <Link className="btn btn-outline-success" to="/admin/addCategory">
        Add New Category <IoDuplicateOutline />
      </Link>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>#</th>
            <th>Category Name</th>
            <th>Store Name</th>
            <th>Image</th>
            <th>Short_id</th>
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
                    return owner.short_id == item.store_short_id
                      ? owner.name
                      : "";
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
                      nav("/admin/editCategory/" + item._id);
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
      {/* show page buttons 
      
      perPage -> how many items we show per page
      apiUrlAmount -> url of the api to get the amount of items
      urlLinkTo -> to where to link on click on page btn
      clsCss -> class for css for buttons
      */}
      <PageLinks
        perPage="5"
        apiUrlAmount={API_URL + "/categories/amount"}
        urlLinkTo={"/admin/categories"}
        clsCss="btn me-2 mt-4 pageLinks"
      />
      {ar.length === 0 ? <LottieAnimation /> : ""}
    </div>
  );
}

export default CategoriesAdmin;
