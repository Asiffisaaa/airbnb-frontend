// src/components/LocationCard.jsx
import React from "react";
import {Link} from "react-router-dom"
import "./LocationCard.css";

const LocationCard = ({ item }) => {
  const { title, description, price, location, imageUrl } = item;

  return (
    <Link to={`/listing/${item._id}`} className="location-card-link">
    <div className="location-card">
      <div className="location-card-image">
        <img src={imageUrl || "/placeholder.jpg"} alt={title} />
      </div>

      <div className="location-card-body">
        <div className="location-card-type">Entire apartment</div>
        <h3 className="location-card-title">{title || location}</h3>
        <p className="location-card-meta">
          {/* small meta text (substitute real fields if present) */}
          {description ? description.substring(0, 120) + (description.length > 120 ? "…" : "") : "Nice place to stay"}
        </p>
        <div className="location-card-amenities">
          {/* if you have amenities array in item, show a few */}
          {item.amenities && Array.isArray(item.amenities) && item.amenities.slice(0, 3).join(" · ")}
        </div>
      </div>

      <div className="location-card-price">
        <div className="price-amount">${price || "N/A"}</div>
        <div className="price-label">/ night</div>
      </div>
    </div>
    </Link>
  );
};

export default LocationCard;
