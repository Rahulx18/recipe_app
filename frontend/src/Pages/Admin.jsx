import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  useEffect(() => {
    if (!userInfo || !userInfo.isAdmin) {
      navigate("/");
    }
  }, [userInfo, navigate]);

  const handleCreateBlog = () => {
    navigate("/createBlog");
  };

  const handleCreateVideo = () => {
    navigate("/createVideo");
  };

  const handleCreateRecipe = () => {
    navigate("/createRecipe");
  };

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin panel. You have admin privileges.</p>

      <div className="admin-buttons">
        <button className="admin-button" onClick={handleCreateBlog}>
          Create Blog
        </button>
        <button className="admin-button" onClick={handleCreateVideo}>
          Create Video
        </button>
        <button className="admin-button" onClick={handleCreateRecipe}>
          Create Recipe
        </button>
      </div>
    </div>
  );
};

export default Admin;
