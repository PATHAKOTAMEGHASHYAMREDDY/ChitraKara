// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "../styles/Home.css";
// import logo from "../assets/logo.png"; // Adjust the path as needed

// function Home() {
//   const navigate = useNavigate();

//   const handleArtist = () => {
//     navigate("/artistlog");
//   };

//   const handleCustomer = () => {
//     navigate("/customerlog");
//   };

//   return (
//     <div className="home-container">
//       {/* Logo Section */}
//       <div className="logo-container">
//         <img src={logo} alt="Chitrakara Logo" className="home-logo" />
//       </div>

//       {/* Buttons Section */}
//       <div className="button-container">
//         <button className="artist-btn" onClick={handleArtist}>
//           I am an Artist
//         </button>
//         <button className="customer-btn" onClick={handleCustomer}>
//           I am a Customer
//         </button>
//       </div>

//       {/* Why Choose Us Section */}
//       <section className="features-section">
//         <h2 className="features-title">Why Choose Chitrakar?</h2>
//         <div className="features">
//           <div className="feature-card">
//             <h3 className="feature-title">🎨 Showcase Your Art</h3>
//             <p className="feature-description">
//               Artists can upload their masterpieces and gain recognition.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3 className="feature-title">📤 Upload & Store</h3>
//             <p className="feature-description">
//               Customers can upload sketches securely to the cloud.
//             </p>
//           </div>
//           <div className="feature-card">
//             <h3 className="feature-title">🤝 Connect & Collaborate</h3>
//             <p className="feature-description">
//               Artists and customers can interact and bring creativity to life.
//             </p>
//           </div>
//         </div>
//       </section>

//       {/* About Us Section */}
//       <section className="about-section">
//         <h2 className="about-title">About Us</h2>
//         <p className="about-description">
//           Chitrakar is a unique platform that bridges the gap between
//           <strong> talented artists</strong> and
//           <strong> passionate customers</strong>. Whether you are an artist
//           looking to showcase your artwork or a customer searching for
//           personalized sketches, we provide the perfect digital space for
//           collaboration and inspiration.
//         </p>
//         <br></br>
//         <p>For Enquiry contact +91 9392950661</p>
//       </section>
//     </div>
//   );
// }

// export default Home;
import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png"; // Adjust the path as needed
import { FaFacebook, FaInstagram, FaTwitter, FaLinkedin } from "react-icons/fa"; // Social media icons

function Home() {
  const navigate = useNavigate();

  const handleArtist = () => {
    navigate("/artistlog");
  };

  const handleCustomer = () => {
    navigate("/customerlog");
  };

  return (
    <div className="home-container">
      {/* Header Section */}
      <header className="header">
        <div className="logo-container">
          <img src={logo} alt="Chitrakara Logo" className="home-logo" />
          <h1 className="site-title">Chitrakar</h1>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <h2 className="hero-title">Unleash Your Creativity</h2>
        <p className="hero-subtitle">
          A platform for artists and customers to connect, create, and inspire.
        </p>
        <div className="button-container">
          <button className="artist-btn" onClick={handleArtist}>
            I am an Artist
          </button>
          <button className="customer-btn" onClick={handleCustomer}>
            I am a Customer
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Chitrakar?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <span className="feature-icon">🎨</span>
            <h3 className="feature-title">Showcase Your Art</h3>
            <p className="feature-description">
              Artists can upload their masterpieces and gain recognition from a
              global audience.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">📤</span>
            <h3 className="feature-title">Upload & Store</h3>
            <p className="feature-description">
              Customers can securely upload sketches and store them in the
              cloud.
            </p>
          </div>
          <div className="feature-card">
            <span className="feature-icon">🤝</span>
            <h3 className="feature-title">Connect & Collaborate</h3>
            <p className="feature-description">
              Bring creativity to life by connecting artists and customers.
            </p>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="about-section">
        <h2 className="about-title">About Us</h2>
        <p className="about-description">
          Chitrakar is a unique platform that bridges the gap between
          <strong> talented artists</strong> and
          <strong> passionate customers</strong>. Whether you're an artist
          looking to showcase your artwork or a customer seeking personalized
          sketches, we provide the perfect digital space for collaboration and
          inspiration.
        </p>
        <div className="contact-info">
          <p>For inquiries, contact us at: <strong>+91 9392950661</strong></p>
          <p>Email: <a href="mailto:support@chitrakar.com">support@chitrakar.com</a></p>
        </div>
        <div className="social-media">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2025 Chitrakar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;