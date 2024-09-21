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
  const videoDetails = useSelector((state) => state.videos.videoDetails);
  const { video, videoLoading, videoError } = videoDetails;
  const blogDetails = useSelector((state) => state.blogList);
  const recipeDetails = useSelector((state) => state.recipeList);

  const { blogs, loading: blogLoading, error: blogError } = blogDetails;
  const { recipes, loading: recipeLoading, error: recipeError } = recipeDetails;

  if (videoLoading || blogLoading || recipeLoading) {
    return <p>Loading...</p>;
  }

  if (videoError || blogError || recipeError) {
    return (
      <p style={{ color: "red" }}>{videoError || blogError || recipeError}</p>
    );
  }
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

      {type === "blogs" && blogs && (
        <Card className="text-white bg-dark">
          <Card.Img src={blogs.image} alt={blogs.title} />
          <Card.Body>
            <Card.Title>{blogs.title}</Card.Title>
            <Card.Text>{blogs.content}</Card.Text>
            <Card.Text>
              Published on: {new Date(blogs.date).toLocaleDateString()}
            </Card.Text>
          </Card.Body>
        </Card>
      )}

      {type === "recipes" && recipes && (
        <Card className="text-white bg-dark">
          <Card.Img src={recipes.thumbnail} alt={recipes.title} />
          <Card.Body>
            <Card.Title>{recipes.title}</Card.Title>
            <Card.Text>{recipes.description}</Card.Text>
            <Card.Text>Ingredients: {recipes.ingredients.join(", ")}</Card.Text>
            <Card.Text>Instructions: {recipes.instructions}</Card.Text>
            {recipe.videoURL && (
              <Button variant="primary" href={recipes.videoURL}>
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
