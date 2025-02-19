import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/artisthome.css";
import logo1 from "../assets/logo1.png"; // Add your logo file in the assets folder

function Artisthome() {
  const location = useLocation();
  const navigate = useNavigate();
  const username = location.state?.username;
  const [paintingTitle, setPaintingTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");

  // Handle Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", paintingTitle);
    formData.append("image", image);
    formData.append("price", price);
    formData.append("contact", contact);
    formData.append("artist", username);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/uploadpainting",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert(response.data.message);
      setPaintingTitle("");
      setImage(null);
      setPrice("");
      setContact("");
    } catch (error) {
      alert(error.response?.data?.error || "Upload Failed");
    }
  };

  return (
    <div className="artisthome-container">
      {/* Logo linking to artist's paintings page */}
      <img
        src={logo1}
        alt="Artist Paintings"
        className="logo"
        onClick={() => navigate("/artistpaintings", { state: { username } })}
      />
      <button onClick={()=>navigate('/artistorders',{state:{username}})}>go to your orders</button>

      <h1>Welcome, {username}!</h1>
      <p>Showcase your beautiful paintings to the world!</p>

      {/* Upload Form */}
      <div className="upload-form-container">
        <h2>Upload Your Painting</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="painting-title">Painting Title</label>
            <input
              type="text"
              id="painting-title"
              placeholder="Enter painting title"
              value={paintingTitle}
              onChange={(e) => setPaintingTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Upload Image</label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="price">Price (in ₹)</label>
            <input
              type="number"
              id="price"
              placeholder="Enter price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="contact">Contact Details</label>
            <input
              type="text"
              id="contact"
              placeholder="Enter your contact details"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              required
            />
          </div>
          <button type="submit">Upload Painting</button>
        </form>
      </div>
    </div>
  );
}

export default Artisthome;
