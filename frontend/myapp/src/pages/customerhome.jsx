import React, { useState, useEffect } from "react";
import axios from "axios";
// import "../styles/customerhome.css";
import { useLocation } from "react-router-dom";

function CustomerHome() {
  const location = useLocation();
  const username = location.state?.username;
  const [paintings, setPaintings] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch all paintings from the database
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

  // Filter paintings based on search query (artist name)
  const filteredPaintings = paintings.filter((painting) =>
    searchQuery
      ? painting.artist.toLowerCase().includes(searchQuery.toLowerCase())
      : true
  );

  // Handle Order
  const handleOrder = async (painting) => {
    try {
      const orderData = {
        customerName: username,
        artistName: painting.artist,
        paintingTitle: painting.title,
        price: painting.price,
        contact: painting.contact,
        imageUrl: painting.imageUrl,
      };

      await axios.post("http://localhost:5000/api/order", orderData);

      alert(`Order placed for ${painting.title}!`);
    } catch (error) {
      console.error("Order failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="customerhome-container">
      <h1>Welcome, {username}!</h1>
      <p>Find and order beautiful paintings from artists</p>

      {/* Search Bar (Search by Artist Name) */}
      <input
        type="text"
        placeholder="Search paintings by artist..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      {/* Display Paintings */}
      <div className="paintings-container">
        {filteredPaintings.length > 0 ? (
          filteredPaintings.map((painting) => (
            <div key={painting._id} className="painting-card">
              <img src={painting.imageUrl} alt={painting.title} />
              <h3>{painting.title}</h3>
              <p>Price: ₹{painting.price}</p>
              <p>Artist: {painting.artist}</p>
              <p>Contact: {painting.contact}</p>
              <button onClick={() => handleOrder(painting)}>Order</button>
            </div>
          ))
        ) : (
          <p>No paintings found for this artist!</p>
        )}
      </div>
    </div>
  );
}

export default CustomerHome;
