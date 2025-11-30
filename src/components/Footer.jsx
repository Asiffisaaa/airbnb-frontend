// src/components/Footer.jsx
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <>
      <footer className="ab-footer">

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
        © 2025 Airbnb Clone — Fisokuhle Ndimande | Privacy · Terms · Sitemap
      </div>
    </>
  );
};

export default Footer;
