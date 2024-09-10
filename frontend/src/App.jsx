import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import LandingPage from "./components/LandingPage/Landingpage";
import Recipes from "./Pages/Recipes";
import Blogs from "./Pages/Blogs";
import Videos from "./Pages/Videos";
import Login from "./components/Auth/Login"; // Correct import for Login
import Register from "./components/Auth/Register"; // Correct import for Register
import bannerImg from "./BANNER_FINAL_3.png";
import ReactGA from "react-ga4";
import Admin from "./Pages/Admin";
import CreateBlog from "./Pages/CreatePages/CreateBlog";
import CreateRecipe from "./Pages/CreatePages/CreateRecipe";
import CreateVideo from "./Pages/CreatePages/CreateVideo";

ReactGA.initialize("G-25V5FZJ7BB");
ReactGA.send("pageview");

const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsSidebarOpen(false);
    }
  };

  useEffect(() => {
    if (isSidebarOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSidebarOpen]);

  return (
    <BrowserRouter>
      <div className="App">
        <div ref={sidebarRef}>
          <Sidebar
            isSidebarOpen={isSidebarOpen}
            handleSidebarToggle={handleSidebarToggle}
          />
        </div>
        <div
          className={`content-container ${isSidebarOpen ? "open" : "closed"}`}
        >
          <Header isSidebarOpen={isSidebarOpen} />
          <main className="main-content">
            <img src={bannerImg} alt="Banner" className="banner-image" />
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/recipes" element={<Recipes />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/videos" element={<Videos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              {/**/}
              <Route path="/admin" element={<Admin />} />
              <Route path="/createBlog" element={<CreateBlog />} />
              <Route path="/createRecipe" element={<CreateRecipe />} />
              <Route path="/createVideo" element={<CreateVideo />} />
            </Routes>
          </main>
        </div>
        <Footer isSidebarOpen={isSidebarOpen} />
      </div>
    </BrowserRouter>
  );
};

export default App;
