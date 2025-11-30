import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import "./SearchBar.css";

const SearchBar = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const navigate = useNavigate();

  // Load locations
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const res = await API.get("/accommodations/locations");
        setLocations(res.data || []);
      } catch (err) {
        console.error("Failed to load locations", err);
      }
    };
    fetchLocations();
  }, []);

  // Handle location dropdown navigation
  const handleLocationChange = (val) => {
    setLocation(val);

    if (val === "All Locations") {
  navigate("/location?location=all");
  return;
}else {
      navigate(`/location?location=${encodeURIComponent(val)}`);
    }
  };

  // Apply all filters when user clicks search
  const handleSearch = () => {
    const params = new URLSearchParams();

    if (location) params.set("location", location);
    if (checkIn) params.set("checkin", checkIn);
    if (checkOut) params.set("checkout", checkOut);
    if (guests) params.set("guests", guests);

    const q = params.toString();
    navigate(`/location${q ? "?" + q : ""}`);
  };

  return (
    <div className="search-wrapper">

      <div className="search-field">
        <label>Location</label>
        <select
          value={location}
          onChange={(e) => handleLocationChange(e.target.value)}
        >
          <option value="">Select</option>
          <option value="">All Locations</option>

          {locations.map((loc, idx) => (
            <option key={idx} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      <div className="search-field">
        <label>Check-in</label>
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label>Check-out</label>
        <input
          type="date"
          value={checkOut}
          onChange={(e) => setCheckOut(e.target.value)}
        />
      </div>

      <div className="search-field">
        <label>Guests</label>
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
        />
      </div>

      <button className="search-btn" onClick={handleSearch}>
        🔍
      </button>

    </div>
  );
};

export default SearchBar;
