import React, { useEffect, useState } from "react";
import { FaSearch, FaUser, FaSignOutAlt } from "react-icons/fa";
import { Container, Navbar } from "react-bootstrap";
import SearchOverlay from "../../utility/SearchOverlay";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../actions/authActions";
import "./Header.css";
import logo from "./Udta Rasoiya Logo.png";

const Header = ({ isSidebarOpen }) => {
  const [showSearchOverlay, setShowSearchOverlay] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <header className="header-container">
      <Navbar className={`header ${isSidebarOpen ? "open" : "closed"}`}>
        <Container>
          <div className="logo">
            <img src={logo} alt="Udta Rasoiya Logo" />
          </div>
          <div className="right-section">
            <button
              className="search-button"
              onClick={() => setShowSearchOverlay(true)}
            >
              <FaSearch />
            </button>
            {userInfo ? (
              <div className="welcome-note">
                Welcome, {userInfo.username}!
                <button className="logout-button" onClick={handleLogout}>
                  <FaSignOutAlt /> Logout
                </button>
              </div>
            ) : (
              <button className="user-icon" onClick={handleLoginClick}>
                <FaUser />
              </button>
            )}
          </div>
        </Container>
      </Navbar>
      {showSearchOverlay && (
        <SearchOverlay Close={() => setShowSearchOverlay(false)} />
      )}
    </header>
  );
};

export default Header;
