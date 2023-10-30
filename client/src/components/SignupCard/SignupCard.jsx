import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../SigninCard/SigninCard.css";
import "@fontsource/inter";

const SignupCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("Home Buyer");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8080/signup", {
        username,
        password,
      });

      navigate("/signin");
      console.log(res.message);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="signin-card-container">
      <div className="logo">Lorem Ipsum</div>
      <div className="login-container">
        <h2>Sign up</h2>
        <div className="form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-element">
              <input
                type="text"
                placeholder="U S E R N A M E"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className="form-element">
              <input
                type="password"
                placeholder="P A S S W O R D"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="form-element">
              <input type="submit" value="Sign up" />
              <Link to="/signin">Have an account? Log in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
