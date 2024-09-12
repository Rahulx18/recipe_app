import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createRecipe } from "../../actions/recipeActions";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const recipeList = useSelector((state) => state.recipeList);
  const { success: recipecreated, error, loading } = recipeList;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newRecipe = {
      title,
      ingredients: ingredients.split(","),
      instructions,
      videoURL,
      thumbnail,
      description,
      tags: tags.split(","),
    };

    dispatch(createRecipe(newRecipe));
  };

  return (
    <div className="create-container">
      <h1>Create New Recipe</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients (comma separated)</label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Instructions</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Video URL</label>
          <input
            type="text"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div className="form-group">
          <label>Tags (comma separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default CreateRecipe;
