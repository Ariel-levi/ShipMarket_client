import React from "react";
import { Link } from "react-router-dom";

function HeaderStore(props) {
  return (
    <header>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid">
          <Link to="/" className="logoFont">
            <h2>ShipMarket</h2>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasNavbar"
            aria-controls="offcanvasNavbar"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                goood
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 ps-5">
                <li>
                  <Link className="nav-link" to="/storeAdmin">
                    My Stores
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/storeAdmin">
                    About
                  </Link>
                </li>
                <li>
                  <Link className="nav-link" to="/storeAdmin">
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderStore;
