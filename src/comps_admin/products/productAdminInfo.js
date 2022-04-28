import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LottieAnimation from "../../comps/general_comps/lottieAnimation";
import AuthAdminComp from "../../misc_comps/authAdminComp";
import { API_URL, doApiGet } from "../../services/apiService";
import { BsInfoCircle, BsCardImage } from "react-icons/bs";
import "../css/formStore.css";

function ProductAdminInfo(props) {
  let [product, setProduct] = useState({});
  let params = useParams();
  let nav = useNavigate();

  useEffect(() => {
    doApi();
  }, []);

  const doApi = async () => {
    let url = API_URL + "/products/single/" + params.id;
    let resp = await doApiGet(url);
    // console.log(resp.data);
    setProduct(resp.data);
  };

  return (
    <div className="container">
      <AuthAdminComp />
      <h1 className="text-center mt-3">Product Info</h1>
      <div className="store-form">
        {product._id ? (
          <form>
            <div
              className="form-icon edit_img"
              style={{
                backgroundImage: `url(${product.img_url})`,
              }}
            >
              <span>
                <BsInfoCircle />
              </span>
            </div>
            <div className="form-group">
              <p className="small">Name</p>
              <input
                disabled
                defaultValue={product.name}
                type="text"
                className="form-control item"
                placeholder="product Name"
              />
            </div>
            <div className="form-group">
              <p className="small">Price</p>
              <input
                disabled
                defaultValue={product.price}
                type="text"
                className="form-control item"
                placeholder="Price"
              />
            </div>
            {product.img_url ? (
              <div className="form-group">
                <p className="small">
                  Image <BsCardImage className="mx-1" />
                </p>
                <input
                  disabled
                  defaultValue={product.img_url}
                  type="text"
                  className="form-control item"
                  placeholder="Add Image"
                />
              </div>
            ) : (
              ""
            )}
            {product.condition ? (
              <div className="form-group">
                <p className="small">Condition</p>
                <input
                  disabled
                  defaultValue={product.condition}
                  type="text"
                  className="form-control item"
                  placeholder="Condition"
                />
              </div>
            ) : (
              ""
            )}
            {product.qty ? (
              <div className="form-group">
                <p className="small">Qty</p>
                <input
                  disabled
                  defaultValue={product.qty}
                  type="text"
                  className="form-control item"
                  placeholder="Qty"
                />
              </div>
            ) : (
              ""
            )}
            <div className="form-group">
              <p className="small">Cat Short Id</p>
              <input
                disabled
                defaultValue={product.cat_short_id}
                type="text"
                className="form-control item"
                placeholder="Cat Short Id"
              />
            </div>
            <div className="form-group">
              <p className="small">Store Short Id</p>
              <input
                disabled
                defaultValue={product.store_short_id}
                type="text"
                className="form-control item"
                placeholder="Store Short Id"
              />
            </div>
            <div className="form-group">
              <p className="small">Info</p>
              <textarea
                disabled
                defaultValue={product.info}
                className="form-control item"
                placeholder="product Info"
                style={{ width: "100%", height: "150px" }}
              ></textarea>
            </div>
            <div className="form-group">
              <button
                className="btn btn-block create-account"
                onClick={() => {
                  nav("/admin/products");
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

export default ProductAdminInfo;
