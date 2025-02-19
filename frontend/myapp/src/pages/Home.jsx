import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";
import logo from "../assets/logo.png"; // Adjust the path as needed

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
      {/* Logo Section */}
      <div className="logo-container">
        <img src={logo} alt="Chitrakara Logo" className="home-logo" />
      </div>

      {/* Buttons Section */}
      <div className="button-container">
        <button className="artist-btn" onClick={handleArtist}>
          I am an Artist
        </button>
        <button className="customer-btn" onClick={handleCustomer}>
          I am a Customer
        </button>
      </div>

      {/* Why Choose Us Section */}
      <section className="features-section">
        <h2 className="features-title">Why Choose Chitrakar?</h2>
        <div className="features">
          <div className="feature-card">
            <h3 className="feature-title">🎨 Showcase Your Art</h3>
            <p className="feature-description">
              Artists can upload their masterpieces and gain recognition.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">📤 Upload & Store</h3>
            <p className="feature-description">
              Customers can upload sketches securely to the cloud.
            </p>
          </div>
          <div className="feature-card">
            <h3 className="feature-title">🤝 Connect & Collaborate</h3>
            <p className="feature-description">
              Artists and customers can interact and bring creativity to life.
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
          <strong> passionate customers</strong>. Whether you are an artist
          looking to showcase your artwork or a customer searching for
          personalized sketches, we provide the perfect digital space for
          collaboration and inspiration.
        </p>
        <br></br>
        <p>For Enquiry contact +91 9392950661</p>
      </section>
    </div>
  );
}

export default Home;
