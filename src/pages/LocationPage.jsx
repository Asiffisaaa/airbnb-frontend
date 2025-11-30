// src/pages/LocationPage.jsx
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import API from "../api/api";
import "./Location.css";
import LocationCard from "../components/LocationCard";
import Header from "../components/Header";

const LocationPage = () => {
  const [searchParams] = useSearchParams();
  const locationQuery = searchParams.get("location") || "";
  const guestsQuery = searchParams.get("guests") || "";
  const checkInQuery = searchParams.get("checkin") || "";
  const checkOutQuery = searchParams.get("checkout") || "";

  const [results, setResults] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const loadResults = async () => {
      try {
        // request many so backend pagination (if present) doesn't limit us to 10
        const res = await API.get(
          `/accommodations?location=${encodeURIComponent(locationQuery)}&page=1&limit=100`
        );

        // backend might return:
        // 1) array -> res.data = [ ... ]
        // 2) paginated object -> res.data = { total, page, limit, data: [ ... ] }
        if (Array.isArray(res.data)) {
          setResults(res.data);
          setCount(res.data.length);
        } else if (res.data && Array.isArray(res.data.data)) {
          setResults(res.data.data);
          setCount(res.data.total ?? res.data.data.length);
        } else {
          // fallback: set whatever we received (safely)
          setResults([]);
          setCount(0);
        }
      } catch (err) {
        console.error("Error loading location results", err);
        setResults([]);
        setCount(0);
      }
    };

    // if no locationQuery (meaning user navigated to "All Locations") we still fetch by leaving location blank
    loadResults();
  }, [locationQuery]);
  

  return ( 
    <>
      {/* hide the center nav for all non-home pages */}
      <Header showNav={false} />

      <div className="location-page">
        <div className="location-banner">
          <h1>Stays in {locationQuery || "all"}</h1>
          <div className="location-sub">
            <span>{count} {count === 1 ? "stay" : "stays"} in {locationQuery || "all locations"}</span>
            {guestsQuery && (
              <p className="location-dates">
                {guestsQuery} guests · {checkInQuery} — {checkOutQuery}
              </p>
            )}
          </div>
        </div>

        <div className="location-list">
          {results.length === 0 ? (
            <p className="no-results">No results found.</p>
          ) : (
            results.map((item) => <LocationCard key={item._id} item={item} />)
          )}
        </div>
      </div>
    </>
  );
};



export default LocationPage;
