import "./SigninCard.css";
import "@fontsource/inter";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { NavLink } from "react-router-dom";

const SigninCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://127.0.0.1:8080/signin", {
        username,
        password,
      });
      window.location.href = "/";
      console.log(res.data);
      localStorage.setItem("jwtToken", res.data.token);
      console.log(res.data.token);
      console.log(res.message);
    } catch (err) {
      if (err.response) {
        setAlert(err.response.data.message);
        console.log(err.response.data.message);
      }
      console.log(err);
    }
  };
  return (
    <div className="signin-card-container">
      <div className="signin-header">
        <NavLink to="/" className="logo">
          Lorem Ipsum
        </NavLink>
      </div>
      <div className="login-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-element-login">
            <input
              type="text"
              placeholder="U S E R N A M E"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div className="form-element-login">
              <input
                type="password"
                placeholder="P A S S W O R D"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-element-login">
              {alert && <div className="alertMessage">{alert}</div>}
              <input type="submit" value="Sign In" />
              <Link to="/signup">Don't have an account? Sign up here</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SigninCard;
