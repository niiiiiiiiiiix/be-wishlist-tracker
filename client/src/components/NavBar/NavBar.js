import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  return (
    <div className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          <img
            className="sunny-icon"
            src={process.env.PUBLIC_URL + "/images/sun.svg"}
            alt=""
          />
          SUNNY
        </Link>
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>
        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/demo" className="nav-links" onClick={closeMobileMenu}>
              Demo
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link to="/plans" className="nav-links" onClick={closeMobileMenu}>
              Plans
            </Link>
          </li> */}
          <li className="nav-item">
            <Link
              to="/sign-up"
              className="nav-links sign-up"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
          {/* <li className="nav-item">
            <Link
              to="/sign-in"
              className="nav-links sign-in"
              onClick={closeMobileMenu}
            >
              Sign In
            </Link>
          </li> */}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
