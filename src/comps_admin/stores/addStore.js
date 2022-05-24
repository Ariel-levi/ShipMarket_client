import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { API_URL, doApiMethod } from "../../services/apiService";
import { MdAddBusiness } from "react-icons/md";
import { BsCardImage } from "react-icons/bs";
import "../css/formStore.css";
import ImagesSearch from "../../comps/general_comps/imagesSearch";

function AddStore(props) {
  // for disabled the send btn for avoid multi click on him
  const [btnSend, setBtnSend] = useState(false);
  const [openImageSearch, setOpenImageSearch] = useState(false);
  const [imageSearch, setImageSearch] = useState("");

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

  const onSubForm = (formData) => {
    if (imageSearch) {
      formData.img_url = imageSearch;
    }
    setBtnSend(true);
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/stores";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      // console.log(resp.data);
      if (resp.data._id) {
        toast.success("Store Created");
        // back to the list of stores in the admin panel
        nav("/admin/stores");
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
      <div className="store-form">
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="form-icon">
            <span>
              <MdAddBusiness />
            </span>
          </div>
          <div className="form-group">
            <input
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
            <input
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
            {/* <input
              {...img_urlRef}
              type="file"
              className="form-control item"
              accept="image/png, image/gif, image/jpeg"
            /> */}
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
            <textarea
              {...infoRef}
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
            <button
              className="btn btn-block create-account mx-3"
              disabled={btnSend}
            >
              Create Store
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
      </div>
    </div>
  );
}

export default AddStore;
