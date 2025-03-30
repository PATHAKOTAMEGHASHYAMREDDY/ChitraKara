import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from 'react-router-dom';
import "../styles/artistspaintings.css";

function Artistpaintings() {
    const location = useLocation();
    const username = location.state?.username;
    const [paintings, setPaintings] = useState([]);
    const [deleteStatus, setDeleteStatus] = useState(null); // To track delete success/failure

    useEffect(() => {
        const fetchPaintings = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/paintings`);
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
                await axios.delete(`${import.meta.env.VITE_API_URL}/api/paintings/${paintingId}`, {
                    params: { artist: username }
                });
                setPaintings(paintings.filter(painting => painting._id !== paintingId));
                setDeleteStatus('success'); // Set success status
                setTimeout(() => setDeleteStatus(null), 2000); // Reset after 2 seconds
            } catch (error) {
                console.error("Error deleting painting:", error);
                setDeleteStatus('error'); // Set error status
                setTimeout(() => setDeleteStatus(null), 2000); // Reset after 2 seconds
            }
        }
    };

    return (
        <>
            <div className="paintings-container">
                <h1>{username}'s Paintings</h1>
                {deleteStatus === 'success' && <p className="status-message success">Painting deleted successfully!</p>}
                {deleteStatus === 'error' && <p className="status-message error">Failed to delete painting!</p>}
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
    );
}

export default Artistpaintings;