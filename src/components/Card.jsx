import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Card.css";

const Card = ({ item }) => {
    const current = useLocation();

      // If we are on LOCATION PAGE, make card clickable
  const isLocationPage = current.pathname === "/location";

  const CardContent = (
     <div className="featured-card">
     <img src={item.imageUrl} alt={item.title} />
     <div className="featured-info">
        <h3>{item.title}</h3>
        <p>{item.location}</p>
        <p>R{item.price} / night</p>
      </div>
    </div>
  );

   if (!isLocationPage) return CardContent;

//    on location page wrap link
     return <Link to={`/listing/${item._id}`}>{CardContent}</Link>;
};

export default Card;
