import React from 'react';
import './css/footer.css';
import { BsFacebook, BsTwitter, BsSnapchat, BsInstagram } from 'react-icons/bs';
import { Link } from 'react-router-dom';

function Footer(props) {
  const dt = new Date();

  return (
    <div className="footer-basic">
      <footer>
        <div className="social">
          <a href="#">
            <BsInstagram />
          </a>
          <a href="#">
            <BsSnapchat />
          </a>
          <a href="#">
            <BsTwitter />
          </a>
          <a href="#">
            <BsFacebook />
          </a>
        </div>
        <ul className="list-inline">
          <li className="list-inline-item animaLinkSM">
            <Link to="/createStore">Create Store</Link>
          </li>
          <li className="list-inline-item animaLinkSM">
            <Link to="/storeAdmin">My Stores Panel</Link>
          </li>
          <li className="list-inline-item animaLinkSM">
            <Link to="/delivery">Delivery Panel</Link>
          </li>
        </ul>
        <p className="copyright">ShipMarket Delivery © {dt.getFullYear()}</p>
      </footer>
    </div>
  );
}

export default Footer;
