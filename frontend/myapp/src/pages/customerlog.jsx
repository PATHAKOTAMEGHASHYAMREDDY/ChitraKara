import React, { useState } from "react";
import axios from "axios";
import "../styles/customerlog.css";
import { useNavigate } from "react-router-dom";
function Customerlog() {
  // States for Signup Form
  const navigate = useNavigate();
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");

  // States for Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/customersignup", {
        cname: signupName,
        cemail: signupEmail,
        cpassword: signupPassword,
      });
      alert(response.data.message);

      // Reset Signup Form
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
    } catch (error) {
      alert(error.response?.data?.error || "Signup Failed");
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/customerlogin", {
        cemail: loginEmail,
        cpassword: loginPassword,
      });
      alert(response.data.message);
      navigate("/customerhome",{state:{username:response.data.username}});
      // Reset Login Form
      setLoginEmail("");
      setLoginPassword("");
    } catch (error) {
      alert(error.response?.data?.error || "Login Failed");
    }
  };

  return (
    <div className="customerlog-container">
      {/* Content about Customers */}
      <div className="customer-content">
        <h1>Welcome to Chitrakara</h1>
        <p>
          Chitrakara is a platform where art enthusiasts and customers can explore
          and purchase unique paintings from talented artists worldwide. Join us
          to discover beautiful artworks and support independent creators.
        </p>
      </div>

      {/* Forms Container */}
      <div className="forms-container">
        {/* Login Form */}
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label htmlFor="login-email">Email</label>
              <input
                type="email"
                id="login-email"
                placeholder="Enter your email"
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="login-password">Password</label>
              <input
                type="password"
                id="login-password"
                placeholder="Enter your password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>

        {/* Signup Form */}
        <div className="form-container">
          <h2>Sign Up</h2>
          <form onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label htmlFor="signup-name">Full Name</label>
              <input
                type="text"
                id="signup-name"
                placeholder="Enter your full name"
                value={signupName}
                onChange={(e) => setSignupName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-email">Email</label>
              <input
                type="email"
                id="signup-email"
                placeholder="Enter your email"
                value={signupEmail}
                onChange={(e) => setSignupEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="signup-password">Password</label>
              <input
                type="password"
                id="signup-password"
                placeholder="Enter your password"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Sign Up</button>
          </form>
        </div>
      </div>
      <button onClick={()=>{
        navigate("/")}}>Home</button>
    </div>
  );
}

export default Customerlog;
