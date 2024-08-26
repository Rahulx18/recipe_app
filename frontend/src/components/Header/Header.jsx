import React, { useState } from "react";
import { FaSearch, FaUser } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";
import SearchOverlay from "../../utility/SearchOverlay";
import AuthOverlay from "../../utility/AuthOverlay";
import "./Header.css";
import logo from "./Udta Rasoiya Logo.png";

const Header = ({ isSidebarOpen, handleSidebarToggle }) => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const [showAuthOverlay, setShowAuthOverlay] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleSearchClick = () => setShowSearchOverlay(true);
  const handleAuthClick = () => setShowAuthOverlay(true);
  const closeSearchOverlay = () => setShowSearchOverlay(false);
  const closeAuthOverlay = () => setShowAuthOverlay(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    closeAuthOverlay();
  };

  return (
    <header className="header-container">
      <Navbar className={`header ${isSidebarOpen ? "open" : "closed"}`}>
        <Container>
          <div className="header-toggler-wrapper">
            <button
              className={`sidebar-toggler ${isSidebarOpen ? "open" : "closed"}`}
              onClick={handleSidebarToggle}
            >
              {isSidebarOpen ? "×" : "☰"}
            </button>
          </div>
          <div className="logo">
            <img src={logo} alt="Udta Rasoiya Logo" />
          </div>
          <div className="right-section">
            <button className="search-button" onClick={handleSearchClick}>
              <FaSearch />
            </button>
            {isLoggedIn ? (
              <div className="welcome-note">Welcome, User!</div>
            ) : (
              <button className="user-icon" onClick={handleAuthClick}>
                <FaUser />
              </button>
            )}
          </div>
        </Container>
      </Navbar>
      {showSearchOverlay && <SearchOverlay Close={closeSearchOverlay} />}
      {showAuthOverlay && (
        <AuthOverlay Close={closeAuthOverlay} handleLogin={handleLogin} />
      )}
    </header>
  );
};

export default Header;
