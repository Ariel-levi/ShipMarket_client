import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkTokenLocal } from '../services/localService';
// react icons
import { BiHomeAlt } from 'react-icons/bi';
import { GoListUnordered } from 'react-icons/go';
import { MdOutlineDeliveryDining } from 'react-icons/md';

function HeaderDelivery(props) {
  let [login, setLogin] = useState('');
  let location = useLocation();

  useEffect(() => {
    setLogin(checkTokenLocal());
  }, [location]);

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
            aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                Delivery Panel <MdOutlineDeliveryDining className="ms-2" />
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 ps-5">
                {!login ? (
                  <li>
                    <Link to="/" className="nav-link">
                      Go Home <BiHomeAlt className="ms-1" />
                    </Link>
                  </li>
                ) : (
                  <React.Fragment>
                    <li>
                      <Link className="nav-link" to="/Delivery/">
                        Home <BiHomeAlt className="ms-1" />
                      </Link>
                    </li>
                    <li>
                      <Link className="nav-link" to="/Delivery/openOrders">
                        Open orders <GoListUnordered className="ms-1" />
                      </Link>
                    </li>
                  </React.Fragment>
                )}
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default HeaderDelivery;
