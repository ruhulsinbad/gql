import React from "react";
import "../App.css";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  return (
    <header className="header">
      <Link to="/"> Quote App</Link>
      <ul className="main-nav">
        {token ? (
          <>
            <li>
              <Link to="/createQuote">CreateQuote</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              {" "}
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  navigate("/login");
                }}
              >
                Logout
              </button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/Login">Login</Link>
            </li>

            <li>
              <Link to="/signUp">SignUp</Link>
            </li>
          </>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
