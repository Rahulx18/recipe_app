import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../../actions/blogActions";
import { fetchRecipeById } from "../../actions/recipeActions";
import { fetchVideoById } from "../../actions/videoActions";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../../actions/commentActions";
import { Container, Card, Button, Spinner, Form, Modal } from "react-bootstrap";
import "../Common.css";
import { FaStar, FaRegStar } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";

const SinglePage = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();
  const [showComments, setShowComments] = useState(false);
  const [newComment, setNewComment] = useState("");
  const [loadingComments, setLoadingComments] = useState(true);
  const [errorComments, setErrorComments] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  const auth = useSelector((state) => state.auth);
  const { userInfo } = auth;

  // Toggle favorite function
  const handleFavoriteToggle = (id, type) => {
    setIsFavorite(!isFavorite); // Toggle favorite state
    console.log(`Toggled favorite for ${type} with ID:`, id);
  };

  useEffect(() => {
    if (type === "videos") {
      dispatch(fetchVideoById(id));
    } else if (type === "blogs") {
      dispatch(fetchBlogById(id));
    } else if (type === "recipes") {
      dispatch(fetchRecipeById(id));
    }

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

  const handleDeleteComment = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const confirmDeleteComment = () => {
    dispatch(deleteComment(commentToDelete));
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const cancelDeleteComment = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
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
          <div className="d-flex justify-content-between">
            <Card.Title>{title}</Card.Title>
            {/* Favorite star button */}
            <Button
              variant="link"
              onClick={() => handleFavoriteToggle(id, type)}
              className="p-0"
            >
              {isFavorite ? (
                <FaStar color="gold" size={24} />
              ) : (
                <FaRegStar color="gold" size={24} />
              )}
            </Button>
          </div>
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

        <Card.Body>
          <div className="d-flex justify-content-between">
            <Card.Title>{blog.title}</Card.Title>
            {/* Favorite star button */}
            <Button
              variant="link"
              onClick={() => handleFavoriteToggle(id, type)}
              className="p-0"
            >
              {isFavorite ? (
                <FaStar color="gold" size={24} />
              ) : (
                <FaRegStar color="gold" size={24} />
              )}
            </Button>
          </div>
          <Card.Text>{blog.content}</Card.Text>
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
          <div className="d-flex justify-content-between">
            <Card.Title>{recipes.title}</Card.Title>
            {/* Favorite star button */}
            <Button
              variant="link"
              onClick={() => handleFavoriteToggle(id, type)}
              className="p-0"
            >
              {isFavorite ? (
                <FaStar color="gold" size={24} />
              ) : (
                <FaRegStar color="gold" size={24} />
              )}
            </Button>
          </div>
          <Card.Text>{recipes.description}</Card.Text>
          <Card.Text>Ingredients: {recipes.ingredients.join(", ")}</Card.Text>
          {recipes.videoURL && (
            <Button
              variant="primary"
              href={recipes.videoURL}
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
                      <strong>{comment.user?.username || "Anonymous"}:</strong>{" "}
                      {comment.text}
                    </Card.Text>

                    {(comment.user?._id === (userInfo ? userInfo._id : null) ||
                      userInfo?.isAdmin) && (
                      <Button
                        variant="danger"
                        size="sm"
                        className="float-right"
                        onClick={() => {
                          setCommentToDelete(comment._id);
                          setShowDeleteModal(true);
                        }}
                      >
                        <FaTrash /> {/* Trash icon */}
                      </Button>
                    )}
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
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Add Comment
            </Button>
          </Form>
        </div>
      )}

      {/* Delete Comment Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDeleteComment}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Comment</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this comment?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDeleteComment}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteComment}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default SinglePage;
