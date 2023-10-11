import "./SigninCard.css";
import "@fontsource/inter";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const SigninCard = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //     const res = await axios.post('http://localhost:5173/signin', {
    //         username,
    //         password
    //     });

    //     navigate("/")
    //     console.log(res.message);
    // } catch (err) {
    //     console.log(err);
    // }
  };
  return (
    <div className="signin-card-container">
      <div className="logo">Lorem Ipsum</div>
      <div className="login-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <div className='form-element user'>
          <input 
            type='text'
            placeholder='U S E R N A M E'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        <div className='form-element pass'>
          <input
            type='password'
            placeholder='P A S S W O R D'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className='form-element'>
          <input
            type='submit'
            value= 'Sign In'
          />
          <Link to="/signup">Don't have an account? Sign up here</Link>
        </div>
        </div>
      </form>
    </div>
    </div>
  );
};

export default SigninCard;
