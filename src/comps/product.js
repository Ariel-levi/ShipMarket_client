import React from "react";
import { useDispatch } from "react-redux";
import { addCart } from "../actions/cart_action";
import { MdAddShoppingCart } from "react-icons/md";
import { BsStar, BsStarFill } from "react-icons/bs";
import "./css/product.css";
import { toast } from "react-toastify";

function Product(props) {
  let item = props.item;
  const dispatch = useDispatch();

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="blog-card bg-white mb-4 overflow-hidden d-lg-flex rounded position-relative hover">
            <div className="blog-image overflow-hidden d-flex align-items-center">
              <img
                src={item.img_url || "/images/no_image.png"}
                alt={item.name}
                className="blog-thumbnail"
              />
            </div>
            <div className="p-4 blog-container">
              <small className="font_bold blog-category text-uppercase py-1 px-2 float-left rounded">
                Food
              </small>
              <button className="font_bold text-uppercase py-1 px-2 float-end rounded">
                <BsStar />
              </button>
              <button className="font_bold starColor text-uppercase py-1 px-2 float-end rounded">
                <BsStarFill />
              </button>
              <h4 className="mt-2 font_bold text-dark">{item.name}</h4>
              <p className="text-muted">{item.info}</p>
              <div className="blog-footer d-flex justify-content-between align-items-center border-top">
                <h2 className="mr-2">₪ {item.price}</h2>
                <button
                  className="btn btn-outline-primary"
                  onClick={() => {
                    dispatch(addCart(item));
                    toast.info(item.name + " add to Cart");
                  }}
                >
                  Add to cart <MdAddShoppingCart className="me-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Product;
