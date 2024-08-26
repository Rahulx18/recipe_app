import React from "react";
import { Nav } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className={`sidebar ${isSidebarOpen ? "open" : "closed"}`}>
      <Nav className="flex-column" activeKey={currentPath}>
        <div className="sidebar-section">
          <h5>Dashboard</h5>
          <hr></hr>
          <LinkContainer to="/">
            <Nav.Link eventKey="/">Home</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/recipes">
            <Nav.Link eventKey="/recipes">Recipes</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/blogs">
            <Nav.Link eventKey="/blogs">Blogs</Nav.Link>
          </LinkContainer>
          <LinkContainer to="/videos">
            <Nav.Link eventKey="/videos">Videos</Nav.Link>
          </LinkContainer>
        </div>
        <hr />
        <div className="sidebar-section">
          <h5>Personal</h5>
          <LinkContainer to="/favourites">
            <Nav.Link eventKey="/favourites">Favourites</Nav.Link>
          </LinkContainer>
        </div>
      </Nav>
    </div>
  );
};

export default Sidebar;
