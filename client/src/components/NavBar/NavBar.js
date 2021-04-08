import { React, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import "./NavBar.css";
import axios from "axios";
import { useHistory } from "react-router-dom";
import UserContext from "../../contexts/UserContext";

function NavBar() {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const history = useHistory();

  const { user, setUser } = useContext(UserContext);

  const logoutUrl = `${process.env.REACT_APP_API_URL}/user/logout`;
  const logoutOptions = {
    url: logoutUrl,
    method: "POST",
    withCredentials: true,
    // data: "need some data here if u want config",
  };

  const logUserOut = () => {
    console.log(`${process.env.REACT_APP_API_URL}/user/logout`);
    axios(logoutOptions)
      .then((response) => {
        console.log(response);
        setUser(null);
        alert("Log out success!");
        history.push("/");
      })
      .catch((error) => {
        console.log("HI WHY IS THIS AN ERROR");
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
          {user ? (
            <>
              <li className="nav-item">
                <Link
                  to="/wishlist"
                  className="nav-links"
                  onClick={closeMobileMenu}
                >
                  Wishlist
                </Link>
              </li>
              <li className="nav-item">
                <Link to="#" className="nav-links logout" onClick={logUserOut}>
                  Logout
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                  Home
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
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default NavBar;
