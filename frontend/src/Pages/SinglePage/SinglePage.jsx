import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../../actions/blogActions";
import { fetchRecipeById } from "../../actions/recipeActions";
import { fetchVideoById } from "../../actions/videoActions";
import { Container, Card, Button } from "react-bootstrap";
import "../Common.css";

const SinglePage = () => {
  const { id, type } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (type === "videos") {
      dispatch(fetchVideoById(id));
    } else if (type === "blogs") {
      dispatch(fetchBlogById(id));
    } else if (type === "recipes") {
      dispatch(fetchRecipeById(id));
    }
  }, [dispatch, id, type]);

  // Selectors for fetched data
  const videoDetails = useSelector((state) => state.videoList);
  const blogDetails = useSelector((state) => state.blogList);
  const recipeDetails = useSelector((state) => state.recipeList);

  const { video, loading: videoLoading, error: videoError } = videoDetails;
  const { blog, loading: blogLoading, error: blogError } = blogDetails;
  const { recipe, loading: recipeLoading, error: recipeError } = recipeDetails;

  // Loading and error handling
  if (videoLoading || blogLoading || recipeLoading) {
    return <p>Loading...</p>;
  }

  if (videoError || blogError || recipeError) {
    return (
      <p style={{ color: "red" }}>{videoError || blogError || recipeError}</p>
    );
  }

  // Rendering the content based on the type
  return (
    <Container className="single-page-container">
      {type === "videos" && video && (
        <Card className="text-white bg-dark">
          <Card.Img src={video.thumbnail} alt={video.title} />
          <Card.Body>
            <Card.Title>{video.title}</Card.Title>
            <Card.Text>{video.description}</Card.Text>
            <Card.Text>
              Published on: {new Date(video.date).toLocaleDateString()}
            </Card.Text>
            <Button variant="primary" href={video.embedCode}>
              Watch Video
            </Button>
          </Card.Body>
        </Card>
      )}

      {type === "blogs" && blog && (
        <Card className="text-white bg-dark">
          <Card.Img src={blog.image} alt={blog.title} />
          <Card.Body>
            <Card.Title>{blog.title}</Card.Title>
            <Card.Text>{blog.content}</Card.Text>
            <Card.Text>
              Published on: {new Date(blog.date).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {type === "recipes" && recipe && (
        <Card className="text-white bg-dark">
          <Card.Img src={recipe.thumbnail} alt={recipe.title} />
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>{recipe.description}</Card.Text>
            <Card.Text>Ingredients: {recipe.ingredients.join(", ")}</Card.Text>
            <Card.Text>Instructions: {recipe.instructions}</Card.Text>
            {recipe.videoURL && (
              <Button variant="primary" href={recipe.videoURL}>
                Watch Recipe Video
              </Button>
            )}
          </Card.Body>
        </Card>
      )}
    </Container>
  );
};

export default SinglePage;
