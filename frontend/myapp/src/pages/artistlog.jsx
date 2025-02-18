import React, { useState } from "react";
import "../styles/artistlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Artistlog() {
  // Login Form States
  const navigate = useNavigate();
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Signup Form States
  const [sname, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/artistlogin", {
        semail: loginEmail,
        spassword: loginPassword,
      });
      alert(response.data.message);
      setLoginEmail("");
    setLoginPassword("");
      navigate("/artisthome",{state:{username:response.data.username}});
      // Add your redirect or further actions here
    } catch (error) {
      alert(error.response?.data?.error || "Login Failed");
    }
  };

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/artistsignup", {
        sname,
        semail: signupEmail,
        spassword: signupPassword,
      });
      alert(response.data.message);
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      // Add your redirect or further actions here
    } catch (error) {
      alert(error.response?.data?.error || "Signup Failed");
    }
  };

  return (
    <div className="artistlog-container">
      {/* Content about Chitrakara (Artist) */}
      <div className="artist-content">
        <h1 className="artist-title">Welcome to Chitrakara</h1>
        <p className="artist-description">
          Chitrakara is a platform where talented artists can showcase and sell their paintings to art enthusiasts worldwide. Join us to explore unique artworks and support independent artists.
        </p>
      </div>

      {/* Forms Container */}
      <div className="forms-container">
        {/* Login Form */}
        <div className="form-container">
          <h2 className="form-title">Login</h2>
          <form className="form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="login-email">Email</label>
              <input
                className="form-input"
                type="email"
                id="login-email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="login-password">Password</label>
              <input
                className="form-input"
                type="password"
                id="login-password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button className="form-button" type="submit">Login</button>
          </form>
        </div>

        {/* Signup Form */}
        <div className="form-container">
          <h2 className="form-title">Sign Up</h2>
          <form className="form" onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input
                className="form-input"
                type="text"
                id="signup-name"
                placeholder="Enter your full name"
                value={sname}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-email">Email</label>
              <input
                className="form-input"
                type="email"
                id="signup-email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-password">Password</label>
              <input
                className="form-input"
                type="password"
                id="signup-password"
                placeholder="Enter your password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <button className="form-button" type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <button onClick={()=>{
        navigate("/")}}>Home</button>
    </div>
  );
}

export default Artistlog;
