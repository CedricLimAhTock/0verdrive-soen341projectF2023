import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../SignupCard/SignupCard.css";
import "@fontsource/inter";
import { NavLink } from "react-router-dom";
const SignupCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userRole, setUserRole] = useState("homebuyer");
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://127.0.0.1:8080/signup", {
        username,
        password,
        userRole
      });

      navigate("/signin");
      console.log(res.message);
    } catch (err) {
      setAlert(err.response.data.message);
      console.log(err);
    }
  };

  return (
    <div className="signup-card-container">
      <NavLink to="/" className="logo">
        Lorem Ipsum
      </NavLink>
      <div className="signup-container">
        <h2>Sign Up</h2>
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
            <div className="fname-lname">
              <input type="text" placeholder="F I R S T  N A M E"></input>
              <input type="text" placeholder="L A S T  N A M E"></input>
            </div>
            <div className="form-element">
              <input type="email" placeholder="E M A I L"></input>
            </div>
            <div className="form-element-role centered-select">
              <select
                name="userRole"
                value={userRole}
                onChange={(e) => setUserRole(e.target.value)}
                required
                className="roleSelect"
              >
                <option value="homebuyer">Home Buyer</option>
                <option value="renter">Renter</option>
                <option value="broker">Broker</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            <div className="form-element">
              {alert && <div className="alertMessage">{alert}</div>}
              <input type="submit" value="Sign Up" />
              <Link to="/signin">Have an account? Log in here</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupCard;
