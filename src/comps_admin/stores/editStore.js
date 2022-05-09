import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { FaRegEdit } from "react-icons/fa";
import { BsCardImage } from "react-icons/bs";
import LottieAnimation from "../../comps/general_comps/lottieAnimation";
import "../css/formStore.css";
import ImagesSearch from "../../comps/general_comps/imagesSearch";

function EditStore(props) {
  const [store, setStore] = useState({});
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState("");
  let params = useParams();
  let nav = useNavigate();

  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let nameRef = register("name", {
    required: true,
    minLength: 2,
    maxLength: 150,
  });
  let addressRef = register("address", { required: true, minLength: 5 });
  let infoRef = register("info", { required: true, minLength: 5 });
  let img_urlRef = register("img_url", {
    required: false,
    minLength: 3,
    maxLength: 500,
  });

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let urlStore = API_URL + "/stores/single/" + params.id;
    let resp2 = await doApiGet(urlStore);
    setStore(resp2.data);
    setImageSearch(resp2.data.img_url);
  };

  const onSubForm = (formData) => {
    formData.img_url = imageSearch;
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/stores/" + store._id;
    try {
      let resp = await doApiMethod(url, "PUT", formData);
      // console.log(resp.data);
      if (resp.data.modifiedCount) {
        toast.success("store updated");
        // back to the list of stores in the admin panel
        nav("/admin/stores");
      } else {
        toast.warning("you not change nothing");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
      nav("/admin/stores");
    }
  };

  return (
    <div className="container">
      <AuthAdminComp />
      {openImageSearch ? (
        <ImagesSearch
          setOpenImageSearch={setOpenImageSearch}
          setImageSearch={setImageSearch}
        />
      ) : (
        ""
      )}
      <h1 className="text-center mt-3">Edit Store</h1>
      <div className="store-form">
        {store._id ? (
          <form onSubmit={handleSubmit(onSubForm)}>
            <div
              className="form-icon edit_img"
              style={{
                backgroundImage: `url(${store.img_url})`,
              }}
            >
              <span>
                <FaRegEdit />
              </span>
            </div>
            <div className="form-group">
              <p className="small">* Name</p>
              <input
                defaultValue={store.name}
                {...nameRef}
                type="text"
                className="form-control item"
                placeholder="Store Name *"
              />
              {errors.name ? (
                <small className="text-danger d-block">
                  * Enter valid name, min 2 chars
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <p className="small">* Address</p>
              <input
                defaultValue={store.address}
                {...addressRef}
                type="address"
                className="form-control item"
                placeholder="Address *"
              />
              {errors.address ? (
                <small className="text-danger d-block">
                  * Enter valid address, min 5 chars
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <button
                className="btn animaLinkSM mb-2"
                onClick={(e) => {
                  setOpenImageSearch(true);
                  e.preventDefault();
                }}
              >
                Get image from Pexels <BsCardImage className="mx-2" />
              </button>
              <input
                {...img_urlRef}
                defaultValue={imageSearch}
                type="text"
                className="form-control item"
                placeholder="Add Image"
              />
              {errors.img_url ? (
                <small className="text-danger d-block">
                  * Enter valid image, min 3 chars
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <p className="small">* Info</p>
              <textarea
                defaultValue={store.info}
                {...infoRef}
                required
                className="form-control item"
                placeholder="Store Info *"
                style={{ width: "100%", height: "150px" }}
              ></textarea>
              {errors.info ? (
                <small className="text-danger d-block">
                  * Enter valid info, min 5 chars
                </small>
              ) : (
                ""
              )}
            </div>
            <div className="form-group">
              <button className="btn btn-block create-account mx-3">
                Edit
              </button>
              <button
                className="btn btn-block create-account"
                onClick={(e) => {
                  e.preventDefault();
                  nav(-1);
                }}
              >
                Back
              </button>
            </div>
          </form>
        ) : (
          <LottieAnimation />
        )}
      </div>
    </div>
  );
}

export default EditStore;
