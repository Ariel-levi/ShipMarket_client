import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { API_URL, doApiGet, doApiMethod } from "../../services/apiService";
import { IoDuplicateOutline } from "react-icons/io5";
import { BsCardImage } from "react-icons/bs";
import "../css/formStore.css";

function AddCategory(props) {
  let [ar, setAr] = useState([]);
  let [btnSend, setBtnSend] = useState(false);

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    // get all stores for the [store_short_id]
    let url = API_URL + "/stores";
    try {
      let resp2 = await doApiGet(url);
      // console.log(resp2.data);
      setAr(resp2.data);
    } catch (err) {
      if (err.response) {
        console.log(err.response.data);
      }
    }
  };

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
  let url_nameRef = register("url_name", {
    required: true,
    minLength: 2,
    maxLength: 150,
  });
  let img_urlRef = register("img_url", {
    required: false,
    minLength: 3,
    maxLength: 500,
  });
  let store_short_idRef = register("store_short_id", {
    required: true,
  });

  const onSubForm = (formData) => {
    console.log(formData);
    setBtnSend(true);
    doFormApi(formData);
  };

  const doFormApi = async (formData) => {
    let url = API_URL + "/categories";
    try {
      let resp = await doApiMethod(url, "POST", formData);
      // console.log(resp.data);
      if (resp.data._id) {
        toast.success("Category Created");
        // back to the list of categories in the admin panel
        nav("/admin/categories");
      }
    } catch (err) {
      console.log(err.response);
      alert("There problem try again later");
      nav("/admin/categories");
    }
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <div className="store-form">
        <form onSubmit={handleSubmit(onSubForm)}>
          <div className="form-icon">
            <span>
              <IoDuplicateOutline />
            </span>
          </div>
          <div className="form-group">
            <input
              {...nameRef}
              type="text"
              className="form-control item"
              placeholder="Category Name *"
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
              {...url_nameRef}
              type="text"
              className="form-control item"
              placeholder="Category Url Name *"
            />
            {errors.url_name ? (
              <small className="text-danger d-block">
                * Enter valid name, min 2 chars
              </small>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <p className="small">
              Add Image <BsCardImage className="mx-1" />
            </p>
            {/* <input
            {...img_urlRef}
            type="file"
            className="form-control item"
            accept="image/png, image/gif, image/jpeg"
          /> */}
            <input
              {...img_urlRef}
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
            <select
              {...store_short_idRef}
              className="form-control form-select item"
            >
              <option value="">* Select Store</option>
              {ar.map((item) => {
                return (
                  <option key={item._id} value={item.short_id}>
                    {item.name}
                  </option>
                );
              })}
            </select>
            {errors.store_short_id ? (
              <small className="text-danger d-block">* Select option</small>
            ) : (
              ""
            )}
          </div>
          <div className="form-group">
            <button
              className="btn btn-block create-account mx-3"
              disabled={btnSend}
            >
              Create Category
            </button>
            <button
              className="btn btn-block create-account"
              onClick={() => {
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

export default AddCategory;
