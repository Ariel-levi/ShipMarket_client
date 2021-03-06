import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { BiHomeAlt, BiCategory } from 'react-icons/bi';
import { MdStorefront } from 'react-icons/md';
import { BsColumns } from 'react-icons/bs';
import { HiOutlineClipboardList } from 'react-icons/hi';

function HeaderStore(props) {
  const params = useParams();
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
            style={{ maxWidth: '80vw' }}
            className="offcanvas offcanvas-end"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">
                AdminStore
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="offcanvas"
                aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-start flex-grow-1 ps-5">
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to="/">
                    Go Home <BiHomeAlt className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to="/storeAdmin">
                    My Stores <MdStorefront className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to={'/storeAdmin/ordersPanel/' + params.id}>
                    Orders Panel <HiOutlineClipboardList className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to={'/storeAdmin/products/' + params.id}>
                    Products <BsColumns className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to={'/storeAdmin/categories/' + params.id}>
                    Categories <BiCategory className="ms-1" />
                  </Link>
                </li>
                <li data-bs-dismiss="offcanvas">
                  <Link className="nav-link" to={'/storeAdmin/orders/' + params.id}>
                    All Orders <HiOutlineClipboardList className="ms-1" />
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
