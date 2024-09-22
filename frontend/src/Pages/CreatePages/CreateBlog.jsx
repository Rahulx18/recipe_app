import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createBlog, resetBlogCreate } from "../../actions/blogActions";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    image: "",
    date: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const blogState = useSelector((state) => state.blogList);
  const { blogCreated, error, loading } = blogState;

  useEffect(() => {
    if (blogCreated) {
      navigate("/admin");
      dispatch(resetBlogCreate());
    }
  }, [blogCreated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newBlog = {
      title: formData.title,
      content: formData.content,
      image: formData.image,
      date: formData.date ? new Date(formData.date) : new Date(),
    };

    dispatch(createBlog(newBlog));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="create-container">
      <h1>Create New Blog</h1>
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Image URL (optional)</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Date (optional)</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleInputChange}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
