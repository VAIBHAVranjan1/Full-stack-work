import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { userContext } from "../context/authContext";

const NavBar = () => {
  const {currentUser, logout} = useContext(userContext);
  return (
    <nav>
      <ul>
        <Link to="/"><li>Home</li></Link>
        {/* <Link to="/login"><li>Login</li></Link>
        <Link to="/register"><li>Register</li></Link> */}
        <Link to="/post/:id"><li>Single</li></Link>
        <Link to="/write"><li>Write</li></Link>
        {currentUser ? (
        <button className="logout-button" onClick={() => logout()}>Logout</button>
          ) : (
            <Link className="llink" to="/login">Login</Link>
        )}

      </ul>
    </nav>
  );
};

export default NavBar;
