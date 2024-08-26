import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVideos } from "../actions/videoActions";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
    // Implement the logic to add/remove the video from the watch later list
    console.log("Toggled favorite for video:", videoId);
  };

  return (
    <Container>
      <Row className="content">
        {hasResults(videos) ? (
          videos.map((video) => (
            <Col key={video._id} md={4} sm={6} xs={12} className="mb-4">
              <a
                href={video.videoURL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-decoration-none"
              >
                <Card
                  className="h-100 position-relative text-white"
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  <Card.Img
                    variant="top"
                    src={video.thumbnail || "default-thumbnail.jpg"}
                    alt={video.title}
                    style={{
                      height: "100%",
                      objectFit: "cover",
                      filter: "brightness(0.7)", // Darken the image slightly for better text visibility
                    }}
                  />
                  <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="link"
                        className="p-0 text-white"
                        onClick={(e) => {
                          e.preventDefault(); // Prevent the card link from being triggered
                          handleFavoriteToggle(video._id);
                        }}
                      >
                        <AiOutlineStar size={24} />
                      </Button>
                    </div>

                    <div className="mt-auto">
                      <Card.Title className="mb-1">{video.title}</Card.Title>
                      <Card.Text className="text-small text-truncate">
                        {video.description.substring(0, 60)}...
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">
                          Published on{" "}
                          {new Date(video.date).toLocaleDateString()}
                        </small>
                      </Card.Text>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </a>
            </Col>
          ))
        ) : (
          <p style={{ color: "white" }}>No videos found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Videos;
