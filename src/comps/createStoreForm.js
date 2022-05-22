import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import { BsCardImage } from "react-icons/bs";
import { API_URL, doApiMethod } from "./../services/apiService";
import { toast } from "react-toastify";
import "./css/register.css";
import ImagesSearch from "./general_comps/imagesSearch";

function CreateStoreForm(props) {
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

  const onSubForm = (data) => {
    console.log(data);
    if (imageSearch) {
      data.img_url = imageSearch;
    }
    console.log(data);
    setBtnSend(true);
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + "/stores";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
        nav("/");
        toast.success(
          "store requests sent successfully, and pending for admin approval"
        );
      }
    } catch (err) {
      if (err.response.data.code == 11000) {
        toast.error(err.response.data.message);
      } else {
        alert("There problem , try come back later");
      }
    }
  };

  let nameRef = register("name", { required: true, minLength: 2 });
  let addressRef = register("address", { required: true, minLength: 5 });
  let infoRef = register("info", { required: true, minLength: 5 });
  let img_urlRef = register("img_url", {
    required: false,
    minLength: 3,
    maxLength: 500,
  });

  return (
    <div className="container">
      {openImageSearch ? (
        <ImagesSearch
          setOpenImageSearch={setOpenImageSearch}
          setImageSearch={setImageSearch}
        />
      ) : (
        ""
      )}
      <motion.div
        initial={{ y: "-100vw" }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="text-center mt-5"
      >
        <h3 className="mb-3">You want to own a store ?</h3>
        <h6>All you have to do is fill out this form and we'll contact you</h6>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.7 }}
        className="register-photo"
      >
        <div className="form-container">
          <div
            className="image-holder"
            style={{ backgroundImage: `url("/images/createStore.jpg")` }}
          ></div>
          <form onSubmit={handleSubmit(onSubForm)}>
            <h2 className="text-center">
              <strong>Request</strong> to create a Store.
            </h2>
            {/* name */}
            <div className="form-group mb-3">
              <input
                {...nameRef}
                className="form-control"
                type="name"
                // value="aaaaaaaaaaaaaa"
                placeholder="* Store Name"
              />
              {errors.name ? (
                <small className="text-danger d-block">
                  * Enter valid name, min 2 chars
                </small>
              ) : (
                ""
              )}
            </div>
            {/* address */}
            <div className="form-group mb-3">
              <input
                {...addressRef}
                className="form-control"
                type="address"
                // value="aaaaaaaaaaaaaa"
                placeholder="* Address"
              />
              {errors.address ? (
                <small className="text-danger d-block">* Address invalid</small>
              ) : (
                ""
              )}
            </div>
            {/* Store image */}
            <div className="form-group mb-3">
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
                className="form-control"
                type="text"
                placeholder="Image"
              />
              {errors.img_url ? (
                <small className="text-danger d-block">
                  * Enter valid image, min 3 chars
                </small>
              ) : (
                ""
              )}
            </div>
            {/* store info */}
            <div className="form-group mb-3">
              <textarea
                {...infoRef}
                // value="aaaaaaaaaaaaaa"
                className="form-control"
                placeholder="* Store info "
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
            <div className="form-group mb-3">
              <button
                disabled={btnSend}
                className="btn btn-primary col-12"
                type="submit"
              >
                Send Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateStoreForm;
