import React, { useEffect, useState } from "react";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import "./AuthOverlay.css";

const AuthOverlay = ({ Close, handleLogin }) => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };
  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      Close();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);
  return (
    <div className="auth-overlay">
      <div className="auth-container">
        <button className="close-button" onClick={Close}>
          X
        </button>
        {isLogin ? <Login onLogin={handleLogin} /> : <Register />}
        <button onClick={toggleForm} className="switch-form">
          {isLogin
            ? "Don't have an account? Register"
            : "Already have an account? Login"}
        </button>
      </div>
    </div>
  );
};

export default AuthOverlay;
