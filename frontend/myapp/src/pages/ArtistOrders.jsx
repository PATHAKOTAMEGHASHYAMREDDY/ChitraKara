import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import "../styles/artistorders.css";

function ArtistOrders() {
  const location = useLocation();
  const username = location.state?.username;
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data.filter((order) => order.artistName === username));
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, [username]);

  return (
    <div className="orders-container">
      <h1>{username}'s Orders</h1>
      {orders.length > 0 ? (
        orders.map((order) => (
          <div key={order._id} className="order-card">
            <img src={order.imageUrl} alt={order.paintingTitle} />
            <h3>{order.paintingTitle}</h3>
            <p>Price: ₹{order.price}</p>
            <p>Ordered by: {order.customerName}</p>
            <p>Contact: {order.contact}</p>
          </div>
        ))
      ) : (
        <p>No orders received yet!</p>
      )}
    </div>
  );
}

export default ArtistOrders;
