import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createVideo } from "../../actions/videoActions"; // Action to create a video
import { useNavigate } from "react-router-dom";
import "./Create.css";

const CreateVideo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [videoURL, setVideoURL] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [tags, setTags] = useState("");
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Fetch the video creation status from Redux state
  const videoCreate = useSelector((state) => state.videoCreate);
  const { success, error } = videoCreate;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const newVideo = {
      title,
      description,
      videoURL,
      thumbnail,
      tags: tags.split(","),
    };

    dispatch(createVideo(newVideo));
  };

  // Handle success and error side effects
  if (success) {
    setLoading(false);
    window.alert("Video created successfully!");
    navigate("/admin");

    // Reset form fields after submission
    setTitle("");
    setDescription("");
    setVideoURL("");
    setThumbnail("");
    setTags("");
  }

  if (error) {
    setLoading(false);
    window.alert(`Error: ${error}`);
  }

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
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Video URL</label>
          <input
            type="text"
            value={videoURL}
            onChange={(e) => setVideoURL(e.target.value)}
            required
          />
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

export default CreateVideo;
