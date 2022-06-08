import React from 'react';
import { useDispatch } from 'react-redux';
import { addCart, deleteCartSingle, reduceOneCart } from '../redux/actions/cart_action';
import { BsEraser } from 'react-icons/bs';

function CartItem(props) {
  const dispatch = useDispatch();
  let item = props.item;
  let i = props.i;

  return (
    <div className="product order border mb-2 text-center">
      <div className="row">
        <div className="col-md-1 product-name mt-4">
          <div style={{ fontWeight: 'bold' }} className="">
            {i + 1}
          </div>
        </div>
        <div className="col-md-3">
          <img
            // style={{ height: "100%" }}
            className="img-fluid mx-auto d-block image"
            src={item.img_url}
          />
        </div>
        <div className="col-md-3">
          <div className="info">
            <div className="row" style={{ fontWeight: 'bold' }}>
              <div className="mt-3 product-name">
                <div className="product-name">
                  <div className="mt-2">{item.name}</div>
                </div>
              </div>
              <div className="mt-2 text-success">
                <span>₪ {item.price}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-md-5 mt-3">
          {/* add button */}
          <button
            className="btn btn-outline-success btn-item"
            onClick={() => dispatch(addCart(item))}>
            +
          </button>
          <span className="mx-2" style={{ fontSize: '1.2em' }}>
            {item.amount}
          </span>
          {/* reduce button */}
          <button
            className="btn btn-outline-danger btn-item"
            onClick={() => dispatch(reduceOneCart(item._id))}>
            -
          </button>
          <button
            onClick={() => dispatch(deleteCartSingle(item._id))}
            className="btn btn-outline-danger mx-5">
            <BsEraser />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
