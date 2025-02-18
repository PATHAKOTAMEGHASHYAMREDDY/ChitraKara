import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/artisthome.css";
import { useLocation } from "react-router-dom";

function Artisthome() {
  const location = useLocation();
  const username = location.state?.username;
  const [paintingTitle, setPaintingTitle] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [contact, setContact] = useState("");
  const [paintings, setPaintings] = useState([]);

  // Fetch Paintings
  useEffect(() => {
    const fetchPaintings = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/paintings");
        setPaintings(response.data);
      } catch (error) {
        console.error("Error fetching paintings:", error);
      }
    };
    fetchPaintings();
  }, []);

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
      // Refresh paintings
      const updatedPaintings = await axios.get("http://localhost:5000/api/paintings");
      setPaintings(updatedPaintings.data);
    } catch (error) {
      alert(error.response?.data?.error || "Upload Failed");
    }
  };

  return (
    <div className="artisthome-container">
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

      {/* Display All Paintings */}
      <div className="paintings-container">
        <h2>Your Uploaded Paintings</h2>
        {paintings.length > 0 ? (
          paintings
            .filter((painting) => painting.artist === username)
            .map((painting) => (
              <div key={painting._id} className="painting-card">
                <img src={painting.imageUrl} alt={painting.title} />
                <h3>{painting.title}</h3>
                <p>Price: ₹{painting.price}</p>
                <p>Contact: {painting.contact}</p>
                <p>Artist: {painting.artist}</p>
              </div>
            ))
        ) : (
          <p>No paintings uploaded yet!</p>
        )}
      </div>
    </div>
  );
}

export default Artisthome;
