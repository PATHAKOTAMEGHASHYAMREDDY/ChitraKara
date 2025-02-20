// import React, { useState, useRef } from "react";
// import axios from "axios";
// import "../styles/customerlog.css";
// import { useNavigate } from "react-router-dom";
// import { ArrowDown, ArrowUp } from "lucide-react"; // Importing icons

// function Customerlog() {
//   const navigate = useNavigate();

//   // States for Signup Form
//   const [signupName, setSignupName] = useState("");
//   const [signupEmail, setSignupEmail] = useState("");
//   const [signupPassword, setSignupPassword] = useState("");

//   // States for Login Form
//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   // Refs for scrolling
//   const loginRef = useRef(null);
//   const signupRef = useRef(null);

//   // Smooth Scroll Functions
//   const scrollToSignup = () => {
//     signupRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   const scrollToLogin = () => {
//     loginRef.current.scrollIntoView({ behavior: "smooth" });
//   };

//   // Handle Signup Submit
//   const handleSignupSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/customersignup", {
//         cname: signupName,
//         cemail: signupEmail,
//         cpassword: signupPassword,
//       });
//       alert(response.data.message);

//       // Reset Signup Form
//       setSignupName("");
//       setSignupEmail("");
//       setSignupPassword("");
//       scrollToLogin(); // Scrolls back to login after signup success
//     } catch (error) {
//       alert(error.response?.data?.error || "Signup Failed");
//     }
//   };

//   // Handle Login Submit
//   const handleLoginSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post("http://localhost:5000/api/customerlogin", {
//         cemail: loginEmail,
//         cpassword: loginPassword,
//       });
//       alert(response.data.message);
//       navigate("/customerhome", { state: { username: response.data.username } });

//       // Reset Login Form
//       setLoginEmail("");
//       setLoginPassword("");
//     } catch (error) {
//       alert(error.response?.data?.error || "Login Failed");
//     }
//   };

//   return (
//     <div className="customerlog-container">
//       {/* 🌟 Customer Introduction Section */}
//       <div className="customer-intro">
//         <h1 className="customer-title">Hey Art Enthusiast</h1>
//         <p className="customer-description">
//           🛍️ **Chitrakar** is a platform for art lovers to discover and purchase unique, handcrafted paintings.
//           Whether you're looking to decorate your space or support talented artists, join our growing art community!
//         </p>
//         <p className="customer-highlight">
//           Sign up today and explore a world where **art meets passion!** 🎨✨
//         </p>
//       </div>

//       {/* Login Section */}
//       <div className="form-container" ref={loginRef}>
//         <h2 className="form-title">Login</h2>
//         <form className="form" onSubmit={handleLoginSubmit}>
//           <div className="form-group">
//             <label className="form-label" htmlFor="login-email">Email</label>
//             <input
//               className="form-input"
//               type="email"
//               id="login-email"
//               placeholder="Enter your email"
//               value={loginEmail}
//               onChange={(e) => setLoginEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label" htmlFor="login-password">Password</label>
//             <input
//               className="form-input"
//               type="password"
//               id="login-password"
//               placeholder="Enter your password"
//               value={loginPassword}
//               onChange={(e) => setLoginPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="form-button" type="submit">Login</button>
//         </form>
//         {/* Scroll Down Icon */}
//         <br></br>
//         <p>Click on arrow to Sign Up</p>
//         <div className="scroll-down" onClick={scrollToSignup}>
//           <ArrowDown size={30} color="#00897B" />
//         </div>
//       </div>

//       {/* Signup Section */}
//       <div className="form-container" ref={signupRef}>
//         <h2 className="form-title">Sign Up</h2>
//         <form className="form" onSubmit={handleSignupSubmit}>
//           <div className="form-group">
//             <label className="form-label" htmlFor="signup-name">Full Name</label>
//             <input
//               className="form-input"
//               type="text"
//               id="signup-name"
//               placeholder="Enter your full name"
//               value={signupName}
//               onChange={(e) => setSignupName(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label" htmlFor="signup-email">Email</label>
//             <input
//               className="form-input"
//               type="email"
//               id="signup-email"
//               placeholder="Enter your email"
//               value={signupEmail}
//               onChange={(e) => setSignupEmail(e.target.value)}
//               required
//             />
//           </div>
//           <div className="form-group">
//             <label className="form-label" htmlFor="signup-password">Password</label>
//             <input
//               className="form-input"
//               type="password"
//               id="signup-password"
//               placeholder="Enter your password"
//               value={signupPassword}
//               onChange={(e) => setSignupPassword(e.target.value)}
//               required
//             />
//           </div>
//           <button className="form-button" type="submit">Sign Up</button>
//         </form>
//         {/* Scroll Up Icon */}
//         <br></br>
//         <p>Existing user ? Login</p>
//         <div className="scroll-up" onClick={scrollToLogin}>
//           <ArrowUp size={30} color="#00897B" />
//         </div>
//       </div>

//       <button onClick={() => navigate("/")}>Home</button>
//     </div>
//   );
// }

// export default Customerlog;
import React, { useState, useRef } from "react";
import axios from "axios";
import "../styles/customerlog.css";
import { useNavigate } from "react-router-dom";
import { ArrowDown, ArrowUp } from "lucide-react";

function Customerlog() {
  const navigate = useNavigate();

  // States for Signup Form
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupMessage, setSignupMessage] = useState({ text: "", type: "" });

  // States for Login Form
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [loginMessage, setLoginMessage] = useState({ text: "", type: "" });

  // Refs for scrolling
  const loginRef = useRef(null);
  const signupRef = useRef(null);

  // Smooth Scroll Functions
  const scrollToSignup = () => signupRef.current.scrollIntoView({ behavior: "smooth" });
  const scrollToLogin = () => loginRef.current.scrollIntoView({ behavior: "smooth" });

  // Handle Signup Submit
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/api/customersignup", {
        cname: signupName,
        cemail: signupEmail,
        cpassword: signupPassword,
      });
      setSignupMessage({ text: response.data.message, type: "success" });
      setSignupName("");
      setSignupEmail("");
      setSignupPassword("");
      setTimeout(() => scrollToLogin(), 1500);
    } catch (error) {
      setSignupMessage({ text: error.response?.data?.error || "Signup Failed", type: "error" });
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
      setLoginMessage({ text: response.data.message, type: "success" });
      setLoginEmail("");
      setLoginPassword("");
      setTimeout(() => navigate("/customerhome", { state: { username: response.data.username } }), 1500);
    } catch (error) {
      setLoginMessage({ text: error.response?.data?.error || "Login Failed", type: "error" });
    }
  };

  return (
    <div className="customerlog-container">
      {/* Customer Introduction Section */}
      <div className="customer-intro">
        <h1 className="customer-title">Hey Art Enthusiast</h1>
        <p className="customer-description">
          🛍️ **Chitrakar** is a platform for art lovers to discover and purchase unique, handcrafted paintings.
          Whether you're looking to decorate your space or support talented artists, join our growing art community!
        </p>
        <p className="customer-highlight">
          Sign up today and explore a world where **art meets passion!** 🎨✨
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
          {loginMessage.text && (
            <div className={`message ${loginMessage.type}`}>
              {loginMessage.text}
            </div>
          )}
          <p className="scroll-text">New here? Sign Up</p>
          <div className="scroll-down" onClick={scrollToSignup}>
            <ArrowDown size={30} color="#00897B" />
          </div>
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
          {signupMessage.text && (
            <div className={`message ${signupMessage.type}`}>
              {signupMessage.text}
            </div>
          )}
          <p className="scroll-text">Existing user? Login</p>
          <div className="scroll-up" onClick={scrollToLogin}>
            <ArrowUp size={30} color="#00897B" />
          </div>
        </div>
      </div>

      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default Customerlog;