import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkTokenLocal } from "../services/localService";
import "./css/header.css";

function Header(props) {
  let [login, setLogin] = useState("");
  let [burgerAnimation, setBurgerAnimation] = useState(false);
  let location = useLocation();

  useEffect(() => {
    setLogin(checkTokenLocal());
    setBurgerAnimation(false);
  }, [location]);

  return (
    <header className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
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
    </header>
  );
}

export default Header;
