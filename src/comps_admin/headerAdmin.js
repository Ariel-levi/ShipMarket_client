import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { checkTokenLocal } from "../services/localService";

function HeaderAdmin(props) {
  let [login, setLogin] = useState("");
  let location = useLocation();

  useEffect(() => {
    setLogin(checkTokenLocal());
  }, [location]);

  return (
    <header className="container-fluid">
      <div className="container">
        <div className="row align-items-center">
          <ul className="nav col-md-9">
            {!login ? (
              <li>
                <Link to="/" className="btn">
                  Go Home
                </Link>
              </li>
            ) : (
              <React.Fragment>
                <li>
                  <Link to="/admin/logout" className="btn btn-outline-danger">
                    Log out
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/home">
                    Home
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/orders">
                    Orders
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/users">
                    Users
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/stores">
                    Stores
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/categories">
                    Categories
                  </Link>
                </li>
                <li>
                  <Link className="btn" to="/admin/products">
                    Products
                  </Link>
                </li>
              </React.Fragment>
            )}
          </ul>
          <div className="logo col-md-3 mt-3">
            <img src="/images/wolt.png" width="100" alt="logo img" />
          </div>
        </div>
      </div>
    </header>
  );
}

export default HeaderAdmin;
