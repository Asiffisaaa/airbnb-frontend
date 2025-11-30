// src/pages/Reservations.jsx
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import API from "../api/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "./Reservations.css";

const Reservations = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // Redirect if not logged in
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  // DELETE reservation
  const handleDelete = async (id) => {
    try {
      await API.delete(`/reservations/${id}`);
      alert("Reservation deleted");
      setReservations((prev) => prev.filter((r) => r._id !== id));
    } catch (err) {
      console.error("Delete failed", err);
      alert("Failed to delete reservation");
    }
  };

  // Load reservations
  useEffect(() => {
    const loadReservations = async () => {
      try {
        const res = await API.get("/reservations");
        setReservations(res.data);
      } catch (err) {
        console.error("Failed to load reservations", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) loadReservations();
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header showNav={false} showSearch={false} theme="page" />

      <div className="reservations-container">
        <h1>Your reservations</h1>

        {reservations.length === 0 ? (
          <p>You have no reservations yet.</p>
        ) : (
          <div className="reservations-list">
            {reservations.map((r) => (
              <div key={r._id} className="reservation-card">

                {/* IMAGE */}
                <img
                  src={r.accommodationId?.imageUrl || "/placeholder.jpg"}
                  alt={r.accommodationId?.title}
                  className="reservation-thumb"
                />

                {/* INFO */}
                <div className="reservation-info">
                  <h2>{r.accommodationId?.title || "Property"}</h2>
                  <p>{r.accommodationId?.location}</p>

                  <p>
                    <strong>Check-in:</strong>{" "}
                    {new Date(r.checkIn).toDateString()}
                  </p>

                  <p>
                    <strong>Check-out:</strong>{" "}
                    {new Date(r.checkOut).toDateString()}
                  </p>

                  <p className="reservation-total">
                    <strong>Total:</strong> R {r.totalPrice}
                  </p>

                  {/* DELETE BUTTON */}
                  <button
                    className="delete-res-btn"
                    onClick={() => handleDelete(r._id)}
                  >
                    Delete
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Reservations;
