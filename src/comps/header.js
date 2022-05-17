import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkTokenLocal } from "../services/localService";
import { MdOutlineShoppingCart } from "react-icons/md";
import "./css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowCart } from "../redux/actions/cart_action";

function Header(props) {
  const [login, setLogin] = useState("");
  const [burgerAnimation, setBurgerAnimation] = useState(false);
  const location = useLocation();

  const inputRef = useRef();
  const nav = useNavigate();
  const dispatch = useDispatch();

  const [itemsInCart, setItemsInCart] = useState(0);
  const { cart_ar, showCart } = useSelector((state) => state.clientReducer);

  useEffect(() => {
    setItemsInCart(cart_ar.length);
    setLogin(checkTokenLocal());
    setBurgerAnimation(false);
  }, [location, cart_ar]);

  return (
    <header className="container-fluid">
      <div className="container">
        <div className="row align-items-center text-center">
          <ul
            className={
              !burgerAnimation
                ? "nav col-md-8 ul_links burger_pop"
                : "nav col-md-8 ul_links"
            }
          >
            {login ? (
              <React.Fragment>
                <li>
                  <button
                    className="cartIcon rounded border mx-3"
                    onClick={() => dispatch(ShowCart())}
                  >
                    {cart_ar.length === 0 ? (
                      ""
                    ) : (
                      <p className="position-absolute top-0 start-100 translate-middle itemCart">
                        {itemsInCart}
                      </p>
                    )}
                    <MdOutlineShoppingCart />
                  </button>
                </li>
                <li>
                  <Link className="border rounded text-danger" to="/logout">
                    Log out
                  </Link>
                </li>
                <li>
                  <Link to="/favs">Favorites</Link>
                </li>
                <li>
                  <Link to="/createStore">Create Store</Link>
                </li>
                <li>
                  <Link to="/checkout">Checkout</Link>
                </li>
                <li>
                  <Link to="/oldOrders">Old Orders</Link>
                </li>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link className="border" to="/register">
                    Register
                  </Link>
                </li>
              </React.Fragment>
            )}
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/allStore">Stores</Link>
            </li>
          </ul>
          <div className="logo col-md-3 d-flex mt-3 justify-content-between">
            <Link to="/" className="logoFont">
              <h2>ShipMarket</h2>
            </Link>
            {/* burger */}
            <div
              id="burger_btn"
              onClick={() => {
                burgerAnimation
                  ? setBurgerAnimation(false)
                  : setBurgerAnimation(true);
              }}
              className={burgerAnimation ? "burger change" : "burger"}
            >
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </div>
            {/* end burger */}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
