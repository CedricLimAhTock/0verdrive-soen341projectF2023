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
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [formattedPhone, setFormattedPhone] = useState("");
  const [agency, setAgency] = useState("");
  const [license_number, setLicenseNumber] = useState("");
  const navigate = useNavigate();
  const [alert, setAlert] = useState("");

  const changePhone = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    let formatted = "";
    if (input.length > 0) {
      formatted += "(" + input.substring(0, 3);
      if (input.length > 3) formatted += ")";
    }
    if (input.length > 3) {
      formatted += " " + input.substring(3, 6);
    }
    if (input.length > 6) {
      formatted += "-" + input.substring(6, 10);
    }
    setPhone(input);
    setFormattedPhone(formatted);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log(userRole);
      const res = await axios.post("http://127.0.0.1:8080/signup", {
        username,
        password,
        userRole,
        firstname,
        lastname,
        email,
        phone,
        agency,
        license_number,
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
              <input
                type="text"
                placeholder="F I R S T  N A M E"
                value={firstname}
                onChange={(e) => setFirstName(e.target.value)}
                required
              ></input>
              <input
                type="text"
                placeholder="L A S T  N A M E"
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}
                required
              ></input>
            </div>
            <div className="form-element">
              <input
                type="email"
                placeholder="E M A I L"
                value={email}
                onChange={(e) => setEmail(e.target.value.toLowerCase())}
                required
              ></input>
            </div>
            <div className="form-element">
              <input
                type="tel"
                placeholder="P H O N E  N U M B E R"
                value={formattedPhone}
                onChange={changePhone}
                required
              ></input>
            </div>
            {userRole === "broker" && (
              <div className="fname-lname">
                <input
                  type="text"
                  placeholder="A G E N C Y"
                  value={agency}
                  onChange={(e) => setAgency(e.target.value)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="L I C E N S E"
                  value={license_number}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                ></input>
              </div>
            )}

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
