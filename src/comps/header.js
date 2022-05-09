import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { checkTokenLocal } from "../services/localService";
import { FaBeer, FaCashRegister } from 'react-icons/fa'
import { BsCartDash, BsSearch } from "react-icons/bs"
import "./css/header.css";
import { useDispatch, useSelector } from "react-redux";
import { ShowCart } from "../actions/cart_action";

function Header(props) {
  let [login, setLogin] = useState("");
  let [burgerAnimation, setBurgerAnimation] = useState(false);
  let location = useLocation();
  let inputRef = useRef()
  let nav = useNavigate()
  let dispatch = useDispatch()

  const showCart = useSelector(state => state.showCart)

  useEffect(() => {
    setLogin(checkTokenLocal());
    setBurgerAnimation(false);
  }, [location]);

  const onSearchClick = () => {
    let search = inputRef.current.value
    nav("/products_search?s=" + search)
  }
  const onKeyClick = (e) => {
    if (e.key === "Enter")
      onSearchClick()
  }

  return (
    <header className="container-fluid">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <ul
            className={
              !burgerAnimation
                ? "nav col-md-6 ul_links burger_pop"
                : "nav col-md-6 ul_links"
            }
          >
            {login ? (
              <React.Fragment>
                <li>
                  <Link className="border text-danger" to="/logout">
                    Log out
                  </Link>
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
          <div className="col-md-6 row justify-content-between">

            <div className='searchHeader d-flex col-md-8 ms-3'>
              <input type="text" placeholder='search...' className="form-control" />

          
              <div className="d-flex align-items-center p-3 ">
                <BsSearch className="me-3" onClick={onSearchClick} style={{ color: "gray" }} />
                <BsCartDash onClick={() =>dispatch(ShowCart())} className="me-3" style={{ color: "gray" }} />
                {/* <FaCashRegister style={{ color: "gray" }} /> */}
              </div>
            </div>
            <div className="logo col-md-3 d-flex mt-3 justify-content-between">
              <Link to="/">
                <img
                  className=""
                  src="/images/wolt.png"
                  width="100"
                  alt="logo img"
                />
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
      </div>
    </header>
  );
}

export default Header;
