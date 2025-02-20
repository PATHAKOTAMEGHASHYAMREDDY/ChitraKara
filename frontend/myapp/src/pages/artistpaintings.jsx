import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';

function Artistpaintings() {
    const location = useLocation();
    const username = location.state?.username;
    const [paintings, setPaintings] = useState([]);

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/paintings");
                setPaintings(response.data.filter((painting) => painting.artist === username));
            } catch (error) {
                console.error("Error fetching paintings:", error);
            }
        };
        fetchPaintings();
    }, [username]);
    const handleDelete = async (paintingId) => {
      if (window.confirm("Are you sure you want to delete this painting?")) {
          try {
              await axios.delete(`http://localhost:5000/api/paintings/${paintingId}`, {
                  params: { artist: username }
              });
              setPaintings(paintings.filter(painting => painting._id !== paintingId));
              alert("Painting deleted successfully!");
          } catch (error) {
              console.error("Error deleting painting:", error);
              alert("Failed to delete painting");
          }
      }
  };

    return (
        <>
            <div className="paintings-container">
                <h1>{username}'s Paintings</h1>
                {paintings.length > 0 ? (
                    paintings.map((painting) => (
                        <div key={painting._id} className="painting-card">
                            <img src={painting.imageUrl} alt={painting.title} />
                            <h3>{painting.title}</h3>
                            <p>Price: ₹{painting.price}</p>
                            <p>Contact: {painting.contact}</p>
                            <button 
                                onClick={() => handleDelete(painting._id)}
                                className="delete-button"
                                style={{backgroundColor: 'red', color: 'white', padding: '5px 10px', border: 'none', cursor: 'pointer'}}
                            >
                                Delete
                            </button>
                        </div>
                    ))
                ) : (
                    <p>No paintings uploaded yet!</p>
                )}
            </div>
        </>
    )
}

export default Artistpaintings;