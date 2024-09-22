import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../actions/blogActions";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./Common.css";

const Blogs = () => {
  const dispatch = useDispatch();
  const blogList = useSelector((state) => state.blogList);
  const { blogs, loading, error } = blogList;

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);
  console.log(blogs);
  const hasResults = (results) => results && results.length > 0;

  const handleFavoriteToggle = (blogId) => {
    // Implement the logic to add/remove the blog from the favorites list
    console.log("Toggled favorite for blog:", blogId);
  };

  return (
    <Container>
      <Row className="content">
        {hasResults(blogs) ? (
          blogs.map((blog) => (
            <Col key={blog._id} md={4} sm={6} xs={12} className="mb-4">
              <Link to={`/blogs/${blog._id}`}>
                <Card
                  className="h-100 position-relative text-white"
                  style={{ width: "100%", backgroundColor: "transparent" }}
                >
                  {blog.image && (
                    <Card.Img
                      src={blog.image}
                      alt={blog.title}
                      className="card-image"
                      style={{
                        height: "100%",
                        objectFit: "cover",
                        filter: "brightness(0.7)",
                      }}
                    />
                  )}
                  <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                    <div className="d-flex justify-content-end">
                      <Button
                        variant="link"
                        className="p-0 text-white"
                        onClick={() => handleFavoriteToggle(blog._id)}
                      >
                        <AiOutlineStar size={24} />
                      </Button>
                    </div>

                    <div className="mt-auto">
                      <Card.Title className="mb-1">{blog.title}</Card.Title>
                      <Card.Text className="text-small text-truncate">
                        {blog.content.substring(0, 60)}...
                      </Card.Text>
                      <Card.Text>
                        <small className="text-muted">By {blog.author}</small>
                      </Card.Text>
                    </div>
                  </Card.ImgOverlay>
                </Card>
              </Link>
            </Col>
          ))
        ) : (
          <p style={{ color: "#333" }}>No blogs found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Blogs;
