import { React, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import axios from "axios";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);
  const logUserOut = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/user/logout`, {
        withCredentials: true,
      })
      .then((response) => {
        console.log(response);
        alert("Log out success!");
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
            <Link
              to="/wishlist"
              className="nav-links"
              onClick={closeMobileMenu}
            >
              User_Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/sign-up"
              className="nav-links sign-up"
              onClick={closeMobileMenu}
            >
              Sign Up
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/login"
              className="nav-links sign-in"
              onClick={closeMobileMenu}
            >
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-links logout" onClick={logUserOut}>
              Logout
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
