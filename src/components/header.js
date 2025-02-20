import React from "react";
import logo from "../assets/logo.png";
import toggler from "../assets/toggler.png";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
const Header = () => {
  return (
    <div>
      <div className="navbar bg-lime-950 relative z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle text-white"
            >
              <img src={toggler} alt="toggler" />
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a href="/">Homepage</a>
              </li>
              <li>
                <a href="#Portfolio">Portfolio</a>
              </li>
              <li>
                <a href="#About">About</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <img src={logo} alt="The Wilds Logo" style={{ width: 300 }} />
        </div>
        <div className="navbar-end">
        <Link to="/cart" className="btn btn-ghost btn-circle text-white">
  <div className="indicator">
    <FontAwesomeIcon icon={faShoppingCart} />
    <span className="badge badge-xs badge-primary indicator-item"></span>
  </div>
</Link>
          
            
          
        </div>
      </div>
    </div>
  );
};

export default Header;
