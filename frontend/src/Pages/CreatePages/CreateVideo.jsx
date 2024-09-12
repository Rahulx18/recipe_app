import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from "../../actions/videoActions";
import { useNavigate } from "react-router-dom";
import "./Create.css";

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [embedCode, setEmbedCode] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [ingredients, setIngredients] = useState([{ name: "", link: "" }]);
  const [recipeLink, setRecipeLink] = useState("");
  const [externalLinks, setExternalLinks] = useState({
    songLink: "",
    subscriptionLink: "",
  });
  const [tags, setTags] = useState("");
  const [date, setDate] = useState(""); // New date state
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the video creation status from Redux state
  const videoList = useSelector((state) => state.videoList);
  const { success, error } = videoList;

  useEffect(() => {
    if (success) {
      setLoading(false);
      window.alert("Video created successfully!");

      setTitle("");
      setEmbedCode("");
      setDescription("");
      setThumbnail("");
      setIngredients([{ name: "", link: "" }]);
      setRecipeLink("");
      setExternalLinks({ songLink: "", subscriptionLink: "" });
      setTags("");
      setDate("");
    }

    if (error) {
      setLoading(false);
      window.alert(`Error: ${error}`);
    }
  }, [success, error, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newVideo = {
      title,
      embedCode,
      description,
      thumbnail,
      ingredients,
      recipeLink,
      externalLinks,
      tags: tags.split(" #").map((tag) => tag.trim().replace("#", "")),
      date: date ? new Date(date) : new Date(),
    };

    dispatch(createVideo(newVideo));
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: "", link: "" }]);
  };

  return (
    <div className="create-container">
      <h1>Create New Video</h1>
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
          <label>Embed Code</label>
          <input
            type="text"
            value={embedCode}
            onChange={(e) => setEmbedCode(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Thumbnail URL</label>
          <input
            type="text"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Ingredients</label>
          {ingredients.map((ingredient, index) => (
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
            value={recipeLink}
            onChange={(e) => setRecipeLink(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>External Links</label>
          <input
            type="text"
            placeholder="Song Link"
            value={externalLinks.songLink}
            onChange={(e) =>
              setExternalLinks({ ...externalLinks, songLink: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Subscription Link"
            value={externalLinks.subscriptionLink}
            onChange={(e) =>
              setExternalLinks({
                ...externalLinks,
                subscriptionLink: e.target.value,
              })
            }
          />
        </div>

        <div className="form-group">
          <label>Tags (" #" separated)</label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
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
