// src/pages/Home.jsx 
import React, { useEffect, useState } from "react";
import "./Home.css";
import API from "../api/api";
import Card from "../components/Card";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar"; // ★ ADD THIS

const Home = () => {
  const [featured, setFeatured] = useState([]);
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const loadFeatured = async () => {
      try {
        const res = await API.get("/accommodations/featured/list");
        setFeatured(res.data || []);
      } catch (err) {
        console.error("Error loading featured:", err);
      }
    };
    loadFeatured();
  }, []);

  useEffect(() => {
    const loadLocations = async () => {
      try {
        const res = await API.get("/accommodations/locations");
        setLocations(res.data || []);
      } catch (err) {
        console.error("Error loading locations:", err);
      }
    };
    loadLocations();
  }, []);

  const saInspiration = [
    { title: "Table Mountain", subtitle: "Cape Town" },
    { title: "V&A Waterfront", subtitle: "Cape Town" },
    { title: "Robben Island", subtitle: "Cape Town" },
    { title: "Chapman's Peak Drive", subtitle: "Cape Town" },
    { title: "Blyde River Canyon", subtitle: "Mpumalanga" },
    { title: "Kruger National Park", subtitle: "Mpumalanga" },
    { title: "Panorama Route", subtitle: "Mpumalanga" },
    { title: "God's Window", subtitle: "Mpumalanga" },
    { title: "Drakensberg", subtitle: "KwaZulu-Natal" },
    { title: "Zulu Culture Tours", subtitle: "KwaZulu-Natal" },
    { title: "uShaka Marine World", subtitle: "Durban" },
    { title: "Durban Golden Mile", subtitle: "Durban" },
    { title: "Stellenbosch Vineyards", subtitle: "Western Cape" },
    { title: "Hermanus Whale Watching", subtitle: "Western Cape" },
    { title: "Addo Elephant Park", subtitle: "Eastern Cape" },
  ];

  return (
    <>
      {/* 🔥 TOP BLACK AREA */}
      <div className="home-top-bg">

        {/* Header with NAV (Home page only) */}
        <Header showNav={true}  showSearch={true} theme="home"/>

        {/* HERO */}
        <section className="hero">
          <div className="hero-text">
            <h1>Find Your Next Stay</h1>
            <p>Discover amazing places around South Africa.</p>
          </div>
        </section>
      </div>

      {/* WHITE AREA */}
      <div className="home-container">
        {/* FEATURED */}
        <section className="featured">
          <h2>Featured Stays</h2>

          <div className="featured-grid">
            {featured.map((item) => (
              <Card key={item._id} item={item} />
            ))}
          </div>
        </section>

        {/* INSPIRATION */}
        <section className="inspiration">
          <div className="inspiration-inner">
            <h2>Inspiration for future getaways</h2>

            <div className="insp-tabs">
              <span>Destinations for arts and culture</span>
              <span>Destinations for outdoor adventure</span>
              <span>Mountain cabins</span>
              <span>Beach destinations</span>
              <span>Popular destinations</span>
              <span>Unique stays</span>
            </div>

            <div className="inspiration-grid">
              {saInspiration.map((place, idx) => (
                <div className="inspiration-item" key={idx}>
                  <h4>{place.title}</h4>
                  <p>{place.subtitle}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-columns">

            <div className="footer-col">
              <h4>Support</h4>
              <ul>
                <li>Help Center</li>
                <li>Safety information</li>
                <li>Cancellation options</li>
                <li>Our COVID-19 Response</li>
                <li>Supporting people with disabilities</li>
                <li>Report a neighborhood concern</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Community</h4>
              <ul>
                <li>Airbnb.org: disaster relief housing</li>
                <li>Support Afghan refugees</li>
                <li>Combating discrimination</li>
                <li>Join the LGBTQ+ community</li>
                <li>Guest Referrals</li>
                <li>Gift cards</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>Hosting</h4>
              <ul>
                <li>Try hosting</li>
                <li>AirCover: protection for Hosts</li>
                <li>Explore hosting resources</li>
                <li>Visit our community forum</li>
                <li>How to host responsibly</li>
                <li>Host an online experience</li>
              </ul>
            </div>

            <div className="footer-col">
              <h4>About</h4>
              <ul>
                <li>Newsroom</li>
                <li>Learn about new features</li>
                <li>Letter from our founders</li>
                <li>Careers</li>
                <li>Investors</li>
                <li>Airbnb Luxe</li>
              </ul>
            </div>

          </div>
        </footer>

        <div className="copyright-bar">
          <p>© 2025 Airbnb Clone — Fisokuhle Ndimande | Privacy · Terms · Sitemap</p>
        </div>

      </div>
    </>
  );
};

export default Home;
