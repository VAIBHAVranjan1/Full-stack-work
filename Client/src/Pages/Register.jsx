import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // State for error message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Reset error message before submitting

    try {
      const inputs = { user_name: name, email, password, img: "" };
      console.log(inputs);

      const response = await axios.post(
        "http://localhost:3000/auth/register",
        inputs,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      console.log("Response:", response.data);
      alert("Registration successful!");
      navigate("/login");
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);

      // Check if the error is due to user already existing
      if (error.response?.data?.message === "User already exists") {
        setErrorMessage("User already exists, please login.");
      } else {
        setErrorMessage("An error occurred. Please try again.");
      }
      navigate("/login")
    }
  };

  return (
    <div className="register-container">
      <form className="register-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
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
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "👁‍🗨" : "👁"}
            </button>
          </div>
        </div>
        <button type="submit">Register</button>

        {/* Show error message below the button */}
        {errorMessage && <p className="error-message">{errorMessage}</p>}

        <p className="login-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
