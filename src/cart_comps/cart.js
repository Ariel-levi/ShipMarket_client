import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "./cartItem";
import "../comps/css/cart.css";
import { resetAll, ShowCart } from "../actions/cart_action";

function Cart(props) {
  let [total, setTotal] = useState(0);

  const { cart_ar, showCart, totalPrice } = useSelector((state) => state);
  const dispatch = useDispatch();

  return (
    <div style={{ display: showCart }} className="cart">
      <button
        onClick={() => dispatch(ShowCart())}
        className="btn btn-outline-danger close-btn"
      >
        x
      </button>
      <h2 className="m-2">All my Products</h2>
      {cart_ar.map((item) => {
        return <CartItem key={item._id} item={item} />;
      })}

      <h2 className="my-3">
        Total: <span className="text-success"> ₪ {totalPrice}</span>
      </h2>
      {cart_ar.length > 0 ? (
        <button
          onClick={() => dispatch(resetAll())}
          className="btn btn-outline-danger float-start btn-item"
        >
          delete all
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Cart;
