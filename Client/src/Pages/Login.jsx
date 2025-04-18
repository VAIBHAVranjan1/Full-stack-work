import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../CSSing/Login.css";
import { userContext } from "../context/authContext";

const Login = () => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const { login } = useContext(userContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    const inputs = { email, password };

    try {
      const response = await login(inputs);
      console.log("Response:", response?.data);
      alert("Login successful!");
      navigate("/")
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      if (error.response?.status === 404) {
        setErrorMessage("User not found. Please register.");
      } else if (error.response?.status === 401) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <div className="password-container">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
        </div>
        <button type="submit">Login</button>

        {/* Show error message below the login button */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="register-link">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
