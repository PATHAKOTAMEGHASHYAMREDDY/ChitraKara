import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png"; // Adjust the path as needed
import sliderImage1 from "../assets/slider1.jpg"; // Add your slider images
import sliderImage2 from "../assets/slider2.jpg";
import sliderImage3 from "../assets/slider3.jpg";
import sliderImage4 from "../assets/slider4.jpg";
import sliderImage5 from "../assets/slider5.jpg";
import sliderImage6 from "../assets/slider6.jpg";
import sliderImage7 from "../assets/slider7.jpg";
import sliderImage8 from "../assets/slider8.jpg";
import sliderImage9 from "../assets/slider9.jpg";
import sliderImage10 from "../assets/slider10.jpg";
import { FaLinkedin } from "react-icons/fa"; // Social media icons
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

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
        <div className="social-media">
          <h3>Contact Us</h3>
          <div className="social-icons">
            <a target="_blank" rel="noopener noreferrer">
              <FaLinkedin
                className="social-icon"
                onClick={() => {
                  window.open("/team");
                }}
              />
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 Chitrakar. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Home;