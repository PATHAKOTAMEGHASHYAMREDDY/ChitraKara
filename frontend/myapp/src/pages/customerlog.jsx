import React, { useState, useRef } from "react";
import "../styles/customerlog.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";

function Customerlog() {
  const navigate = useNavigate();

  // States for Signup Form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState({ text: "", type: "" });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [isSignupLoading, setIsSignupLoading] = useState(false); // Loader state

  // States for Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState({ text: "", type: "" });
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false); // Loader state

  // Refs for scrolling (optional, retained for potential use)
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  // Toggle Password Visibility Functions
  const toggleLoginPassword = () => setShowLoginPassword(!showLoginPassword);
  const toggleSignupPassword = () => setShowSignupPassword(!showSignupPassword);

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setIsSignupLoading(true);
    try {
      const response = await axios.post(`${import.meta.env}/api/customersignup`, {
        cname: signupName,
        cemail: signupEmail,
        cpassword: signupPassword,
      });
      setSignupMessage({ text: response.data.message, type: "success" });
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => {
        setIsSignupLoading(false);
      }, 1500);
    } catch (error) {
      setSignupMessage({ text: error.response?.data?.error || "Signup Failed", type: "error" });
      setIsSignupLoading(false);
    }
  };

  // Handle Login Submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setIsLoginLoading(true);
    try {
      const response = await axios.post(`${import.meta.env}/api/customerlogin`, {
        cemail: loginEmail,
        cpassword: loginPassword,
      });
      setLoginMessage({ text: response.data.message, type: "success" });
      setLoginEmail("");
      setLoginPassword("");
      setTimeout(() => {
        setIsLoginLoading(false);
        navigate("/customerhome", { state: { username: response.data.username } });
      }, 1500);
    } catch (error) {
      setLoginMessage({ text: error.response?.data?.error || "Login Failed", type: "error" });
      setIsLoginLoading(false);
    }
  };

  return (
    <div className="customerlog-container">
      {/* Customer Introduction Section */}
      <div className="customer-intro">
        <h1 className="customer-title">Hey Art Enthusiast</h1>
        <p className="customer-description">
          🛍️ <strong>Chitrakar</strong> is a platform for art lovers to discover and purchase unique, handcrafted paintings.
          Whether you're looking to decorate your space or support talented artists, join our growing art community!
        </p>
        <p className="customer-highlight">
          Sign up today and explore a world where <strong>art meets passion!</strong> 🎨✨
        </p>
      </div>

      {/* Forms Container */}
      <div className="forms-wrapper">
        {/* Login Section */}
        <div className="form-container" ref={loginRef}>
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
              <div className="password-wrapper">
                <input
                  className="form-input"
                  type={showLoginPassword ? "text" : "password"}
                  id="login-password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  required
                />
                <button type="button" className="password-toggle" onClick={toggleLoginPassword}>
                  {showLoginPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <button className="form-button" type="submit" disabled={isLoginLoading}>
              {isLoginLoading ? <span className="loader"></span> : "Login"}
            </button>
          </form>
          {loginMessage.text && (
            <div className={`message ${loginMessage.type}`}>{loginMessage.text}</div>
          )}
          <br></br>
           <a href="/forgotpassword" style={{textAlign:"center"}}>Forgot Passowrd ?</a>
        </div>

        {/* Signup Section */}
        <div className="form-container" ref={signupRef}>
          <h2 className="form-title">Sign Up</h2>
          <form className="form" onSubmit={handleSignupSubmit}>
            <div className="form-group">
              <label className="form-label" htmlFor="signup-name">Full Name</label>
              <input
                className="form-input"
                type="text"
                id="signup-name"
                placeholder="Enter your full name"
                value={signupName}
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
              <div className="password-wrapper">
                <input
                  className="form-input"
                  type={showSignupPassword ? "text" : "password"}
                  id="signup-password"
                  placeholder="Enter your password"
                  value={signupPassword}
                  onChange={(e) => setSignupPassword(e.target.value)}
                  required
                />
                <button type="button" className="password-toggle" onClick={toggleSignupPassword}>
                  {showSignupPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>
            <button className="form-button" type="submit" disabled={isSignupLoading}>
              {isSignupLoading ? <span className="loader"></span> : "Sign Up"}
            </button>
          </form>
          {signupMessage.text && (
            <div className={`message ${signupMessage.type}`}>{signupMessage.text}</div>
          )}
         
        </div>
        
      </div>

      <button className="home-btn" onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default Customerlog;