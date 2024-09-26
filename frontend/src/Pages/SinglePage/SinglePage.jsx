import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../../actions/blogActions";
import { fetchRecipeById } from "../../actions/recipeActions";
import { fetchVideoById } from "../../actions/videoActions";
import { fetchComments, addComment } from "../../actions/commentActions";
import { Container, Card, Button, Spinner, Form, Col } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "../Common.css";

const SinglePage = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true); // State for loading comments
  const [errorComments, setErrorComments] = useState(null); // State for comments error

  useEffect(() => {
    if (type === "videos") {
      dispatch(fetchVideoById(id));
    } else if (type === "blogs") {
      dispatch(fetchBlogById(id));
    } else if (type === "recipes") {
      dispatch(fetchRecipeById(id));
    }

    // Fetch comments and handle loading/error states
    const fetchAndHandleComments = async () => {
      try {
        await dispatch(fetchComments(id, type));
        setLoadingComments(false);
      } catch (error) {
        setErrorComments("Error fetching comments");
        setLoadingComments(false);
      }
    };

    fetchAndHandleComments();
  }, [dispatch, id, type]);

  const {
    singleVideo,
    loading: videoLoading,
    error: videoError,
  } = useSelector((state) => state.videoList);
  const {
    blog,
    loading: blogLoading,
    error: blogError,
  } = useSelector((state) => state.blogList);
  const {
    recipes,
    loading: recipeLoading,
    error: recipeError,
  } = useSelector((state) => state.recipeList);
  const {
    comments,
    loading: commentLoading,
    error: commentError,
  } = useSelector((state) => state.comments);

  const loadingContent = videoLoading || blogLoading || recipeLoading;
  const errorContent = videoError || blogError || recipeError;

  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim()) {
      dispatch(addComment(id, type, { text: newComment }));
      setNewComment("");
    }
  };

  if (loadingContent) {
    return <Spinner animation="border" />;
  }

  if (errorContent) {
    return <p style={{ color: "red", textAlign: "center" }}>{errorContent}</p>;
  }

  let content;

  if (type === "videos" && singleVideo) {
    const { title, description, date, embedCode } = singleVideo;

    content = (
      <Card className="text-white bg-dark single-page-card">
        <Card.Header>
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{description}</Card.Text>
          <Card.Text>
            <strong>Published on:</strong>{" "}
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (type === "blogs" && blog) {
    content = (
      <Card className="text-white bg-dark single-page-card">
        <Col className="d-flex justify-content-center align-items-center">
          {blog.image && (
            <Card.Img
              src={blog.image}
              alt={blog.title}
              style={{
                width: "auto",
                maxHeight: "40vh",
                objectFit: "cover",
              }}
            />
          )}
        </Col>

        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
          <Card.Text>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {blog.content}
            </ReactMarkdown>
          </Card.Text>
          <Card.Text>
            Published on:{" "}
            {blog.date ? new Date(blog.date).toLocaleDateString() : "N/A"}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  } else if (type === "recipes" && recipes) {
    content = (
      <Card className="text-white bg-dark single-page-card">
        {recipes.thumbnail && (
          <Card.Img src={recipes.thumbnail} alt={recipes.title} />
        )}
        <Card.Body>
          <Card.Title>{recipes.title}</Card.Title>
          <Card.Text>{recipes.description}</Card.Text>
          <Card.Text>Ingredients: {recipes.ingredients.join(", ")}</Card.Text>
          {recipes.videoURL && (
            <Button
              variant="primary"
              href={recipes.videoURL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Watch Recipe Video
            </Button>
          )}
        </Card.Body>
      </Card>
    );
  } else {
    content = <p>No content available for this {type}.</p>;
  }

  return (
    <Container className="single-page-container">
      {content}

      <Button
        className="mt-3"
        variant="info"
        onClick={() => setShowComments(!showComments)}
      >
        {showComments
          ? "Hide Comments"
          : `Show Comments (${Array.isArray(comments) ? comments.length : 0})`}
      </Button>

      {showComments && (
        <div className="comments-section">
          {loadingComments ? (
            <Spinner animation="border" />
          ) : errorComments ? (
            <p style={{ color: "red" }}>{errorComments}</p>
          ) : Array.isArray(comments) && comments.length > 0 ? (
            <div className="comments-list">
              {comments.map((comment) => (
                <Card key={comment._id} className="text-dark mb-2">
                  <Card.Body>
                    <Card.Text>
                      <strong>{comment.user || "Anonymous"}:</strong>{" "}
                      {comment.text}
                    </Card.Text>
                  </Card.Body>
                </Card>
              ))}
            </div>
          ) : (
            <p>No comments yet.</p>
          )}

          <Form onSubmit={handleAddComment} className="mt-3">
            <Form.Group controlId="newComment">
              <Form.Control
                type="text"
                placeholder="Add a comment"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Add Comment
            </Button>
          </Form>
        </div>
      )}
    </Container>
  );
};

export default SinglePage;
