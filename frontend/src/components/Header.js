import React from "react";
import { Link } from "react-router-dom";
import "./Header.css"; // Your CSS file for styling

function Header() {
  return (
    <header>
      <div className="logo">
        <Link to="/">YourLogo</Link>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/register">Register</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
