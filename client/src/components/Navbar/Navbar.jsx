import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./Navbar.scss";
const Navbar = () => {
  const { logout, isLogin } = useContext(AuthContext);

  return (
    <nav>
      <div className="nav-wrapper navbar blue">
        <a href="/" className="brand-logo">
         To Do
        </a>
        {isLogin ? (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/" onClick={logout}>Log out</a>
            </li>
          </ul>
        ) : (
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              <a href="/login">Log In</a>
            </li>
            <li>
              <a href="/folder">Folder</a>
            </li>
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
