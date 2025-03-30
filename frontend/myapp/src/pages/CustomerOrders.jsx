import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
// import "../styles/customerorders.css";

function CustomerOrders() {
  const location = useLocation();
  const username = location.state?.username; // Safely access username
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!username) {
        setError("No username provided. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/customerorders/${username}`);
        setOrders(response.data || []); // Ensure orders is always an array
        setError(null);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Failed to load your orders. Please try again later.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [username]); // Dependency on username

  return (
    <div className="customerorders-container">
      <h1>Your Orders, {username || "Guest"}!</h1>
      {loading ? (
        <p>Loading orders...</p>
      ) : error ? (
        <p>{error}</p>
      ) : orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <img src={order.imageUrl} alt={order.paintingTitle} style={{ maxWidth: "200px" }} />
            <p><strong>Title:</strong> {order.paintingTitle}</p>
            <p><strong>Artist:</strong> {order.artistName}</p>
            <p><strong>Price:</strong> ₹{order.price}</p>
            <p><strong>Contact:</strong> {order.contact}</p>
          </div>
        ))
      ) : (
        <p>No orders placed yet.</p>
      )}
    </div>
  );
}

export default CustomerOrders;