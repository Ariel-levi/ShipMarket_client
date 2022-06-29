import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { checkTokenLocal } from '../services/localService';
import { MdStorefront, MdOutlineLogout, MdOutlineLogin } from 'react-icons/md';
import { BiHomeAlt } from 'react-icons/bi';
import { RiUserAddLine } from 'react-icons/ri';
import { AiOutlineStar } from 'react-icons/ai';
import { BsChevronDown, BsClockHistory, BsInfoCircle, BsBagCheck } from 'react-icons/bs';
import './css/header.css';

function Header(props) {
  const [login, setLogin] = useState('');
  const location = useLocation();

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
                User Panel
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 ps-5">
                {login ? (
                  <React.Fragment>
                    <li data-bs-dismiss="offcanvas">
                      <Link className="nav-link rounded text-danger" to="/logout">
                        Log out <MdOutlineLogout className="ms-1" />
                      </Link>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <Link className="nav-link" to="/favs">
                        Favorites <AiOutlineStar className="ms-1" />
                      </Link>
                    </li>
                    <li className="nav-item dropdown">
                      <a
                        href="#"
                        className="nav-link"
                        id="navbarDropdown"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        Checkout <BsChevronDown className="ms-1" />
                      </a>
                      <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <li data-bs-dismiss="offcanvas">
                          <Link className="dropdown-item" to="/checkout">
                            Checkout <BsBagCheck className="ms-1" />
                          </Link>
                        </li>
                        <li data-bs-dismiss="offcanvas">
                          <hr className="dropdown-divider" />
                        </li>
                        <li data-bs-dismiss="offcanvas">
                          <Link to="/oldOrders" className="dropdown-item">
                            Old Orders <BsClockHistory className="ms-1" />
                          </Link>
                        </li>
                      </ul>
                    </li>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <li data-bs-dismiss="offcanvas">
                      <Link className="nav-link text-primary" to="/login">
                        Login <MdOutlineLogin className="ms-1" />
                      </Link>
                    </li>
                    <li data-bs-dismiss="offcanvas">
                      <Link className="nav-link text-success" to="/register">
                        Register <RiUserAddLine className="ms-1" />
                      </Link>
                    </li>
                  </React.Fragment>
                )}
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to="/">
                    Home <BiHomeAlt className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to="/about">
                    About <BsInfoCircle className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to="/allStore">
                    Stores <MdStorefront className="ms-1" />
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

export default Header;
