import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchBlogById } from "../../actions/blogActions";
import { fetchRecipeById } from "../../actions/recipeActions";
import { fetchVideoById } from "../../actions/videoActions";
import { Container, Card, Button, Spinner } from "react-bootstrap";
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

  const loading = videoLoading || blogLoading || recipeLoading;
  const error = videoError || blogError || recipeError;

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (error) {
    return <p style={{ color: "red", textAlign: "center" }}>{error}</p>;
  }

  let content;

  if (type === "videos" && singleVideo) {
    const {
      title,
      description,
      ingredients,
      recipeLink,
      externalLinks,
      date,
      embedCode,
    } = singleVideo;

    content = (
      <Card className="text-white bg-dark">
        <Card.Header>
          <div
            className="embed-container"
            dangerouslySetInnerHTML={{ __html: embedCode }}
          />
        </Card.Header>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>
            <strong>Description:</strong> {description}
          </Card.Text>
          <Card.Text>
            <strong>Ingredients:</strong>
            <ul>
              {ingredients?.map((ingredient, index) => (
                <li key={index}>
                  {ingredient.name}{" "}
                  {ingredient.link && (
                    <a
                      href={ingredient.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Link
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </Card.Text>
          {recipeLink && (
            <Button
              variant="primary"
              href={recipeLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Full Recipe
            </Button>
          )}
          <Card.Text>
            <strong>Published on:</strong>{" "}
            {date ? new Date(date).toLocaleDateString() : "N/A"}
          </Card.Text>
          {externalLinks?.songLink && (
            <Card.Text>
              <strong>Song Link:</strong>{" "}
              <a
                href={externalLinks.songLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {externalLinks.songLink}
              </a>
            </Card.Text>
          )}
          {externalLinks?.subscriptionLink && (
            <Card.Text>
              <strong>Subscription Link:</strong>{" "}
              <a
                href={externalLinks.subscriptionLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {externalLinks.subscriptionLink}
              </a>
            </Card.Text>
          )}
        </Card.Body>
      </Card>
    );
  } else if (type === "blogs" && blog) {
    content = (
      <Card className="text-white bg-dark">
        {blog.image && <Card.Img src={blog.image} alt={blog.title} />}
        <Card.Body>
          <Card.Title>{blog.title}</Card.Title>
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
      <Card className="text-white bg-dark">
        {recipes.thumbnail && (
          <Card.Img src={recipes.thumbnail} alt={recipes.title} />
        )}
        <Card.Body>
          <Card.Title>{recipes.title}</Card.Title>
          <Card.Text>{recipes.description}</Card.Text>
          <Card.Text>Ingredients: {recipes.ingredients.join(", ")}</Card.Text>
          <Card.Text>Instructions: {recipes.instructions}</Card.Text>
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

  return <Container className="single-page-container">{content}</Container>;
};

export default SinglePage;
