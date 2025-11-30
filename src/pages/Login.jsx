// src/pages/LoginPage.jsx
import React, { useState } from "react";
import Header from "../components/Header";
import "./LoginPage.css";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    login(username); // ✅ FIXED — store the username
    alert("Logged in successfully!");

    navigate("/location?location="); // same redirect you wanted
  };

  return (
    <>
      <Header showNav={false} showSearch={false} theme="page" />

      <div className="login-container">
        <div className="login-card">

          <h1 className="login-title">Login</h1>

          <form onSubmit={handleLogin} className="login-form">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />

            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />

            <p className="forgot-password">Forgot Password?</p>

            <button type="submit" className="login-btn">
              Login
            </button>
          </form>

        </div>
      </div>
    </>
  );
};

export default LoginPage;
