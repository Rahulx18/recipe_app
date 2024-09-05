import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import {
  FaHome,
  FaUtensils,
  FaBlog,
  FaVideo,
  FaHeart,
  FaUserCircle,
} from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen, handleSidebarToggle, user }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <div
        className="sidebar-toggle-btn"
        onClick={handleSidebarToggle}
        aria-label="Toggle sidebar"
      >
        {isSidebarOpen ? <MdKeyboardArrowLeft /> : <MdKeyboardArrowRight />}
      </div>
      <hr></hr>
      <Nav className="flex-column" activeKey={currentPath}>
        <div className="sidebar-section">
          <LinkContainer to="/">
            <Nav.Link eventKey="/">
              <FaHome className="sidebar-icon" />
              <span className="sidebar-text">Home</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/recipes">
            <Nav.Link eventKey="/recipes">
              <FaUtensils className="sidebar-icon" />
              <span className="sidebar-text">Recipes</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/blogs">
            <Nav.Link eventKey="/blogs">
              <FaBlog className="sidebar-icon" />
              <span className="sidebar-text">Blogs</span>
            </Nav.Link>
          </LinkContainer>
          <LinkContainer to="/videos">
            <Nav.Link eventKey="/videos">
              <FaVideo className="sidebar-icon" />
              <span className="sidebar-text">Videos</span>
            </Nav.Link>
          </LinkContainer>
          <hr></hr>

          <hr></hr>
          <LinkContainer to={user ? "/profile" : "/login"}>
            <Nav.Link eventKey={user ? "/profile" : "/login"}>
              <FaUserCircle className="sidebar-icon" />
              <span className="sidebar-text">{user ? user.name : "Login"}</span>
            </Nav.Link>
          </LinkContainer>

          <LinkContainer to="/favourites">
            <Nav.Link eventKey="/favourites">
              <FaHeart className="sidebar-icon" />
              <span className="sidebar-text">Favourites</span>
            </Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
