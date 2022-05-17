import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion/dist/framer-motion";
import "./css/register.css";
import { API_URL, doApiMethod } from "./../services/apiService";
import { toast } from "react-toastify";

function CreateStoreFrom(props) {
  let nav = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubForm = (data) => {
    console.log(data);
    doApi(data);
  };

  const doApi = async (_dataBody) => {
    let url = API_URL + "/stores";
    try {
      let resp = await doApiMethod(url, "POST", _dataBody);
      if (resp.data._id) {
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
    // nav("/");
  };

  // let emailRef = register("email", {
  //   required: true,
  //   pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
  // });
  let nameRef = register("name", { required: true, minLength: 2 });
  let addressRef = register("address", { required: true, minLength: 5 });
  let infoRef = register("info", { required: true, minLength: 5 });
  // let phoneRef = register("phone", {
  //   required: true,
  //   minLength: 10,
  //   maxLength: 10,
  // });

  return (
    <div className="container">
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
                name="name"
                placeholder="Name"
                value="yellow"
              />
              {errors.name ? (
                <small className="text-danger d-block">
                  * Enter valid name, min 2 chars
                </small>
              ) : (
                ""
              )}
            </div>
            {/* email */}
            {/* <div className="form-group mb-3">
              <input
                {...emailRef}
                className="form-control"
                type="email"
                name="email"
                placeholder="Email"
                value = "ronennt@gmail.com"
              />
              {errors.email ? (
                <small className="text-danger d-block">* Email invalid</small>
              ) : (
                ""
              )}
            </div> */}
            {/* address */}
            <div className="form-group mb-3">
              <input
                {...addressRef}
                className="form-control"
                type="address"
                name="address"
                placeholder="Address"
                value="einstein"
              />
              {errors.address ? (
                <small className="text-danger d-block">* Address invalid</small>
              ) : (
                ""
              )}
            </div>
            {/* phone */}
            {/* <div className="form-group mb-3">
              <input
                {...phoneRef}
                className="form-control"
                type="phone"
                name="phone"
                placeholder="Phone"
                value = "0542007978"
              />
              {errors.phone ? (
                <small className="text-danger d-block">
                  * Enter valid phone, 10 chars
                </small>
              ) : (
                ""
              )}
            </div> */}
            {/* store info */}
            <div className="form-group mb-3">
              <textarea
                {...infoRef}
                required
                className="form-control"
                placeholder="Store info *"
                value="asjdfkl jkasdlfjlk jasdklfj asjkfjl; fasd kj"
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
              <button className="btn btn-primary col-12" type="submit">
                Send Request
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

export default CreateStoreFrom;
