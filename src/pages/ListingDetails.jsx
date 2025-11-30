// src/pages/ListingDetails.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns";
import API from "../api/api";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

import "./ListingDetails.css";

const ListingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();   // <-- logged in user

  // ----------------------------
  // HOOKS
  // ----------------------------
  const [accommodation, setAccommodation] = useState(null);
  const [loading, setLoading] = useState(true);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 3),
      key: "selection",
    },
  ]);

  // CALCULATE FEES
  const start = dateRange[0].startDate;
  const end = dateRange[0].endDate;
  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const pricePerNight = accommodation?.price || 0;
  const cleaningFee = 150;
  const serviceFee = 120;

  const subtotal = nights * pricePerNight;
  const total = subtotal + cleaningFee + serviceFee;

  // ----------------------------
  // LOAD ACCOMMODATION
  // ----------------------------
  useEffect(() => {
    const load = async () => {
      try {
        const res = await API.get(`/accommodations/${id}`);
        setAccommodation(res.data);
      } catch (err) {
        console.error("Failed to load accommodation", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) load();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!accommodation) return <div>Accommodation not found.</div>;

  // ----------------------------
  // RESERVE BUTTON FUNCTION
  // ----------------------------
  const handleReservation = async () => {
    if (!user) {
      alert("You must login before making a reservation.");
      navigate("/login");
      return;
    }

    try {
      await API.post("/reservations", {
        userId: user.username,              // ← simple user identifier
        accommodationId: id,
        name: user.username,                // can be improved later
        email: `${user.username}@gmail.com`, // temporary fake email
        checkIn: start,
        checkOut: end,
        guests: 1,
        nights,
        pricePerNight,
      });

      alert("Reservation successful!");
      navigate("/reservations");

    } catch (error) {
      console.error("Failed to reserve:", error);
      alert("Failed to make reservation.");
    }
  };

  // ----------------------------
  // MARKUP
  // ----------------------------
  return (
    <>
      <Header showNav={true} showSearch={false} theme="page" />

      <div className="listing-container">
        {/* TITLE */}
        <header className="listing-header">
          <h1>{accommodation.title}</h1>
          <p>{accommodation.location}</p>
        </header>

        {/* GALLERY */}
        <div className="listing-gallery">
          <div className="main-image">
            <img src={accommodation.imageUrl} alt={accommodation.title} />
          </div>

          <div className="thumbs">
            {(accommodation.images?.length
              ? accommodation.images
              : [accommodation.imageUrl]
            )
              .slice(0, 4)
              .map((src, i) => (
                <img key={i} src={src} alt={`thumb ${i}`} />
              ))}
          </div>
        </div>

        {/* MAIN */}
        <section className="listing-main">

          {/* LEFT */}
          <div className="listing-details">
            <h2>About this place</h2>
            <p>{accommodation.description}</p>

            {/* WHERE YOU'LL SLEEP */}
            <section className="sleep-section">
              <h2>Where you'll sleep</h2>

              <div className="sleep-grid">
                {[...Array(accommodation.bedrooms || 1)].map((_, i) => (
                  <div key={i} className="sleep-card">
                    <img
                      src={
                        accommodation.bedroomImages?.[i] ||
                        accommodation.images?.[i] ||
                        accommodation.imageUrl
                      }
                      alt={`Bedroom ${i + 1}`}
                    />
                    <p className="sleep-title">Bedroom {i + 1}</p>
                    <p className="sleep-sub">{accommodation.beds} beds</p>
                  </div>
                ))}
              </div>

              {/* PRICE BREAKDOWN */}
              <section className="price-breakdown">
                <h2>Nights at this stay</h2>
                <div className="breakdown-row">
                  <span>R {pricePerNight} × {nights} nights</span>
                  <span>R {subtotal}</span>
                </div>
                <div className="breakdown-row">
                  <span>Cleaning fee</span>
                  <span>R {cleaningFee}</span>
                </div>
                <div className="breakdown-row">
                  <span>Service fee</span>
                  <span>R {serviceFee}</span>
                </div>
                <hr />
                <div className="breakdown-total">
                  <strong>Total</strong>
                  <strong>R {total}</strong>
                </div>
              </section>
            </section>

            {/* AMENITIES */}
            <section className="amenities-section">
              <h2>What this place offers</h2>
              <div className="amenities-grid">
                {(accommodation.amenities || []).map((item, i) => (
                  <div key={i} className="amenity-item">
                    <span>✔</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* HOST */}
            <section className="host-section">
              <h2>Meet your host</h2>
              <div className="host-card">
                <img
                  src={accommodation.host?.avatar || "/default-avatar.png"}
                  className="host-avatar"
                />
                <div>
                  <h3>{accommodation.host?.name}</h3>
                  <p>Joined {accommodation.host?.joined}</p>
                </div>
              </div>
            </section>

            {/* REVIEWS */}
            <section className="reviews-section">
              <h2>
                ★ {accommodation.rating} · {accommodation.reviews?.length} reviews
              </h2>

              <div className="reviews-grid">
                {(accommodation.reviews || []).map((review, i) => (
                  <div key={i} className="review-card">
                    <div className="review-user">
                      <div className="review-avatar">
                        {review.author?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="review-author">{review.author}</p>
                        <p className="review-date">{review.date}</p>
                      </div>
                    </div>

                    <p className="review-rating">★ {review.rating}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT — RESERVATION */}
          <aside className="listing-reservation">

            <div className="calendar-box">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
              />
            </div>

            <div className="price-box">
              <strong>R {accommodation.price}</strong> / night
            </div>

            <button className="reserve-btn" onClick={handleReservation}>
              Reserve
            </button>
          </aside>
        </section>
      </div>

      <Footer />
    </>
  );
};

export default ListingDetails;
