import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../actions/videoActions";
import { Card, Button, Container } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
import "./Common.css";

const Videos = () => {
  const dispatch = useDispatch();
  const videoList = useSelector((state) => state.videoList);
  const { videos, loading, error } = videoList;

  useEffect(() => {
    dispatch(fetchVideos());
  }, [dispatch]);

  const hasResults = (results) => results && results.length > 0;

  const handleFavoriteToggle = (videoId) => {
    console.log("Toggled favorite for video:", videoId);
  };

  return (
    <Container className="masonry-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : hasResults(videos) ? (
        videos.map((video) => (
          <div key={video._id} className="masonry-item">
            <a href={`/videos/${video._id}`} className="text-decoration-none">
              <Card className="h-100 position-relative text-white">
                <Card.Img
                  variant="top"
                  src={
                    video.thumbnail ||
                    "https://i.imgur.com/default-thumbnail.jpg"
                  }
                  alt={video.title}
                  style={{
                    width: "100%",
                    height: "auto",
                    objectFit: "cover",
                  }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                  <div className="d-flex justify-content-end">
                    <Button
                      variant="link"
                      className="p-0 text-white"
                      onClick={(e) => {
                        e.preventDefault();
                        handleFavoriteToggle(video._id);
                      }}
                    >
                      <AiOutlineStar size={24} />
                    </Button>
                  </div>

                  <div className="mt-auto">
                    <Card.Title
                      className="mb-1 text-truncate"
                      style={{ maxWidth: "90%" }}
                    >
                      {video.title}
                    </Card.Title>
                    <Card.Text
                      className="text-truncate"
                      style={{ maxWidth: "90%" }}
                    >
                      {video.description.length > 60
                        ? `${video.description.substring(0, 60)}...`
                        : video.description}
                    </Card.Text>
                    <Card.Text>
                      <small className="text-muted">
                        Published on {new Date(video.date).toLocaleDateString()}
                      </small>
                    </Card.Text>

                    {/* Button to view full details */}
                    <Button
                      href={`/videos/${video._id}`}
                      variant="light"
                      className="btn-sm mt-2"
                    >
                      View Details
                    </Button>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </a>
          </div>
        ))
      ) : (
        <p style={{ color: "white" }}>No videos found.</p>
      )}
    </Container>
  );
};

export default Videos;
