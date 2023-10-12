import React, { useState } from "react";
import {Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import "../SigninCard/SigninCard.css";
import "@fontsource/inter";

const SigninCard = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async(e) => {
        e.preventDefault();

        // try {
        //     const res = await axios.post('http://localhost:5173/signup', {
        //         username,
        //         password
        //     });

        //     navigate("/login")
        //     console.log(res.message);
        // } catch (err) {
        //     console.log(err);
        // }
    }

    return (
        <div className="signin-card-container">
            <div className="logo">Lorem Ipsum</div>
            <div className="signin-card">
                <h1>Sign Up</h1>
                <div className="fields">
                    <form onSubmit={handleSubmit}>
                    <div className="user">
                        <input
                            type="text"
                            placeholder="U S E R N A M E"
                            className="signin-username" 
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="pass">
                        <input
                            type="password"
                            placeholder="P A S S W O R D"
                            className="signin-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    </form>
                </div>
                <input
                    type='submit'
                    value='Sign Up'
                    className="signinButton"
                />
                <Link className = "redirection" to="/signin">Have an account?</Link>
            </div>
        </div>
    );
};

export default SigninCard;
