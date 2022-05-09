import React from "react";
import { useDispatch } from "react-redux";
import {
  addCart,
  deleteCartSingle,
  reduceOneCart,
} from "../actions/cart_action";
import { BsEraser } from "react-icons/bs";

function CartItem(props) {
  const dispatch = useDispatch();
  let item = props.item;

  return (
    <div className="border pt-2 px-2">
      {/* delete product from cart */}
      <button
        onClick={() => dispatch(deleteCartSingle(item._id))}
        className="btn btn-outline-danger float-end ms-2 btn-item"
      >
        <BsEraser />
      </button>
      <h4>
        <span className="mx-2">{item.name}</span>
        {/* add button */}
        <button
          className="btn btn-outline-success btn-item"
          onClick={() => dispatch(addCart(item))}
        >
          +
        </button>
        <span className="mx-2" style={{ fontSize: "1.2em" }}>
          {item.amount}
        </span>
        {/* reduce button */}
        <button
          className="btn btn-outline-danger btn-item"
          onClick={() => dispatch(reduceOneCart(item._id))}
        >
          -
        </button>
        <span className="mx-2">{item.price}</span>
      </h4>
    </div>
  );
}

export default CartItem;
