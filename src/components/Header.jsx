// src/components/Header.jsx 
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";
import SearchBar from "./SearchBar";
import { useAuth } from "../context/AuthContext";

const Header = ({ showNav = false, showSearch = true, theme = "page" }) => {
  const headerClass = theme === "home" ? "ab-header home-header" : "ab-header page-header";

  const { user, logout } = useAuth();        // <-- added
  const [open, setOpen] = useState(false);    // <-- added
  const navigate = useNavigate();             // <-- added

  const handleProfileClick = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    setOpen(false);
    navigate("/");
  };

  return (
    <header className={headerClass}>
      {/* TOP ROW */}
      <div className="ab-header-row">
        
        {/* LOGO */}
        <Link to="/" className="ab-logo">airbnb</Link>

        {/* NAV TEXT */}
        {showNav && (
          <nav className="ab-nav">
            <span>Places to stay</span>
            <span>Experiences</span>
            <span>Online Experiences</span>
          </nav>
        )}

        {/* RIGHT SECTION */}
        <div className="ab-right">
          <Link to="/admin/login" className="host-link">Become a host</Link>
          <button className="globe-btn">🌐</button>

          {/* PROFILE BUTTON (unchanged visual structure) */}
          <div className="profile-btn" onClick={handleProfileClick}>
            <button className="menu-btn">☰</button>

            {/* If user is NOT logged in → keep login link */}
            {!user && <Link to="/login" className="profile-link">👤</Link>}

            {/* If logged in → replace link with static icon */}
            {user && <span className="profile-link">👤</span>}
          </div>

          {/* ---- DROPDOWN WHEN LOGGED IN ---- */}
          {user && open && (
            <div className="profile-dropdown">
              <p
                className="dropdown-item"
                onClick={() => {
                  navigate("/reservations");
                  setOpen(false);
                }}
              >
                View Reservations
              </p>

              <p className="dropdown-item" onClick={handleLogout}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>

      {/* SEARCH BAR */}
      {showSearch && (
        <div className="ab-search-holder">
          <SearchBar />
        </div>
      )}
    </header>
  );
};

export default Header;
