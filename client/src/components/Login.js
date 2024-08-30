import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './stylelogin.css';
import { initializeScript } from './scriptlogin.js';

const Login = () => {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/login', { name, password });
            if (response.data.message === "Login successful") {
                navigate('/home');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://127.0.0.1:5000/api/signup', { name, email, password });
            alert(response.data.message);
            if (response.data.message === "Signup successful") {
                navigate('/login');
            }
        } catch (error) {
            alert(error.response.data.message);
        }
    };

    useEffect(() => {
        initializeScript();
    }, []);

    return (
        <div className="body111">
            <div className="custom-main">
                <div className="custom-container custom-b-container" id="custom-b-container">
                    <form className="custom-form" id="custom-b-form" onSubmit={handleSubmit}>
                        <h2 className="custom-form_title custom-title">Sign in to Website</h2>
                        <input type="text" className="custom-form__input" placeholder="Email" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="custom-form__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="custom-form__button custom-button custom-submit">SIGN IN</button>
                    </form>
                </div>
                <div className="custom-container custom-a-container" id="custom-a-container">
                    <form className="custom-form" id="custom-a-form" onSubmit={handleSignup}>
                        <h2 className="custom-form_title custom-title">Create Account</h2>
                        <input className="custom-form__input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
                        <input className="custom-form__input" type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input className="custom-form__input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <button className="custom-form__button custom-button custom-submit">SIGN UP</button>
                    </form>
                </div>
                <div className="custom-switch" id="custom-switch-cnt">
                    <div className="custom-switch__circle"></div>
                    <div className="custom-switch__circle custom-switch__circle--t"></div>
                    <div className="custom-switch__container" id="custom-switch-c1">
                        <h2 className="custom-switch__title custom-title">Welcome Back !</h2>
                        <p className="custom-switch__description custom-description">To keep connected with us please login with your personal info</p>
                        <button className="custom-switch__button custom-button custom-switch-btn">SIGN IN</button>
                    </div>
                    <div className="custom-switch__container custom-is-hidden" id="custom-switch-c2">
                        <h2 className="custom-switch__title custom-title">Hello Friend !</h2>
                        <p className="custom-switch__description custom-description">Enter your personal details and start journey with us</p>
                        <button className="custom-switch__button custom-button custom-switch-btn">SIGN UP</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
