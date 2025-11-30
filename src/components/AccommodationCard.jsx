// src/components/AccommodationCard.jsx
import React from "react";
import "./AccommodationCard.css";

const AccommodationCard = ({ item }) => {
  const image =
    (item.images && item.images[0]) ||
    item.imageUrl ||
    "https://via.placeholder.com/600x400?text=No+Image";

  return (
    <div className="fs-card">
      <div
        className="fs-card-img"
        style={{ backgroundImage: `url(${image})` }}
      ></div>

      <div className="fs-card-info">
        <h3 className="fs-title">{item.title}</h3>
        <p className="fs-location">{item.location}</p>
        <p className="fs-price">R {item.price} / night</p>
      </div>
    </div>
  );
};

export default AccommodationCard;
