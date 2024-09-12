import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaYoutube, FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import "./Footer.css";

const Footer = ({ isSidebarOpen }) => {
  return (
    <footer
      className={`footer ${isSidebarOpen ? "sidebar-open" : "sidebar-closed"}`}
    >
      <Container>
        <Row>
          <Col md={6}>
            <h5>About Us</h5>
            <p>
              FoodWeb is a platform where you can explore various recipes,
              blogs, and videos related to food. Join our journey to explore
              vegan recipes and much more!
            </p>
          </Col>
          <Col md={6}>
            <h5>Follow Us</h5>
            <ul className="social-links">
              <li>
                <a
                  href="https://www.youtube.com/channel/UCFJ03OZ7nEL6b1x0-91KtPg"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaYoutube /> YouTube
                </a>
              </li>
              <li>
                <a
                  href="https://www.facebook.com/people/Udta-Rasoiya/100087198259137/?mibextid=LQQJ4d"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookF /> Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/udta.rasoiya/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram /> Instagram
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@udta_rasoiya?_t=8jfq9gqQabu&_r=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaTiktok /> TikTok
                </a>
              </li>
            </ul>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
