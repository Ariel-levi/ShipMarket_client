import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from './cartItem';
import '../comps/css/cart.css';
import { resetAll, ShowCart } from '../redux/actions/cart_action';
import { Link } from 'react-router-dom';

function Cart(props) {
  const { cart_ar, showCart, totalPrice } = useSelector((state) => state.clientReducer);
  const dispatch = useDispatch();

  return (
    <div style={{ display: showCart }} className="light_box">
      <button
        onClick={() => dispatch(ShowCart())}
        className="close-btn btn btn-outline-danger position-absolute top-0 end-0 my-5 me-5">
        x
      </button>

      <div className="inside_box cart position-absolute top-50 start-50 translate-middle">
        <div className="container">
          <h2 className="m-2 text-center">List of Products</h2>
          <div className="row">
            {cart_ar.map((item, i) => {
              return <CartItem key={item._id} i={i} item={item} />;
            })}
          </div>

          <div className="my-3">
            <small className="h3">Total:</small>
            <span className="h2 text-success"> ₪ {totalPrice}</span>
          </div>
          {cart_ar.length > 0 ? (
            <React.Fragment>
              <button
                onClick={() => dispatch(resetAll())}
                className="btn btn-outline-danger col-12 my-3 btn-item">
                delete all
              </button>
              <Link
                onClick={() => dispatch(ShowCart())}
                to="/checkout"
                className="btn btn-success col-12 btn-item">
                Checkout
              </Link>
            </React.Fragment>
          ) : (
            ''
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
