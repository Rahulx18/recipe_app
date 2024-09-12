import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo, resetVideoCreate } from "../../actions/videoActions";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const CreateVideo = () => {
  const [formData, setFormData] = useState({
    title: "",
    embedCode: "",
    description: "",
    thumbnail: "",
    ingredients: [{ name: "", link: "" }],
    recipeLink: "",
    externalLinks: { songLink: "", subscriptionLink: "" },
    tags: "",
    date: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const videoList = useSelector((state) => state.videoList);
  const { success: videoCreated, error, loading } = videoList;

  useEffect(() => {
    if (videoCreated) {
      navigate("/admin");
      dispatch(resetVideoCreate());
    }
  }, [videoCreated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newVideo = {
      title: formData.title,
      embedCode: formData.embedCode,
      description: formData.description,
      thumbnail: formData.thumbnail,
      ingredients: formData.ingredients,
      recipeLink: formData.recipeLink,
      externalLinks: formData.externalLinks,
      tags: formData.tags.split(" #").map((tag) => tag.trim().replace("#", "")),
      date: formData.date ? new Date(formData.date) : new Date(),
    };

    dispatch(createVideo(newVideo));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...formData.ingredients];
    newIngredients[index][field] = value;
    setFormData((prevData) => ({ ...prevData, ingredients: newIngredients }));
  };

  const handleAddIngredient = () => {
    setFormData((prevData) => ({
      ...prevData,
      ingredients: [...prevData.ingredients, { name: "", link: "" }],
    }));
  };

  return (
    <div className="create-container">
      <h1>Create New Video</h1>
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
          <label>Embed Code</label>
          <input
            type="text"
            name="embedCode"
            value={formData.embedCode}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            name="thumbnail"
            value={formData.thumbnail}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {formData.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredient-group">
              <input
                type="text"
                placeholder="Ingredient Name"
                value={ingredient.name}
                onChange={(e) =>
                  handleIngredientChange(index, "name", e.target.value)
                }
                required
              />
              <input
                type="text"
                placeholder="Link (optional)"
                value={ingredient.link}
                onChange={(e) =>
                  handleIngredientChange(index, "link", e.target.value)
                }
              />
            </div>
          ))}
          <button type="button" onClick={handleAddIngredient}>
            Add Another Ingredient
          </button>
        </div>

        <div className="form-group">
          <label>Recipe Link</label>
          <input
            type="text"
            name="recipeLink"
            value={formData.recipeLink}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>External Links</label>
          <input
            type="text"
            placeholder="Song Link"
            name="songLink"
            value={formData.externalLinks.songLink}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                externalLinks: {
                  ...prevData.externalLinks,
                  songLink: e.target.value,
                },
              }))
            }
          />
          <input
            type="text"
            placeholder="Subscription Link"
            name="subscriptionLink"
            value={formData.externalLinks.subscriptionLink}
            onChange={(e) =>
              setFormData((prevData) => ({
                ...prevData,
                externalLinks: {
                  ...prevData.externalLinks,
                  subscriptionLink: e.target.value,
                },
              }))
            }
          />
        </div>

        <div className="form-group">
          <label>Tags (" #" separated)</label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
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

export default CreateVideo;
