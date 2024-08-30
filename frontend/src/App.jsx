import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import LandingPage from "./components/LandingPage/LandingPage";
import Recipes from "./Pages/Recipes";
import Blogs from "./Pages/Blogs";
import Videos from "./Pages/Videos";
import bannerImg from "./BANNER_FINAL_3.png";

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth > 768);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsSidebarOpen(true);
      } else {
        setIsSidebarOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div
          className={`content-container ${isSidebarOpen ? "open" : "closed"}`}
        >
          <Header
            isSidebarOpen={isSidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />
          <main className="main-content">
            <img src={bannerImg} alt="Banner" className="banner-image" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/videos" element={<Videos />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
