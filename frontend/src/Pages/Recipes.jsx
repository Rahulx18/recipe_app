import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../actions/recipeActions";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./Common.css";

const Recipes = () => {
  const [recipes, setRecipes] = useState([]);
  const dispatch = useDispatch();
  const fetchedRecipes = useSelector((state) => state.recipeList);

  useEffect(() => {
    dispatch(fetchRecipes());
  }, [dispatch]);

  useEffect(() => {
    if (fetchedRecipes && fetchedRecipes.recipes) {
      setRecipes(fetchedRecipes.recipes);
    }
  }, [fetchedRecipes]);

  const hasResults = (results) => results && results.length > 0;

  const handleFavoriteToggle = (recipeId) => {
    // Implement the logic to add/remove the recipe from the favorites list
    console.log("Toggled favorite for recipe:", recipeId);
  };

  return (
    <Container>
      <Row className="content">
        {hasResults(recipes) ? (
          recipes.map((recipe) => (
            <Col key={recipe._id} md={4} sm={6} xs={12} className="mb-4">
              <Card
                className="h-100 position-relative text-white"
                style={{ width: "100%", backgroundColor: "transparent" }}
              >
                <Card.Img
                  src={recipe.thumbnail || "default-image.jpg"}
                  alt={recipe.title}
                  className="card-image"
                  style={{
                    height: "100%",
                    objectFit: "cover",
                    filter: "brightness(0.7)",
                  }}
                />
                <Card.ImgOverlay className="d-flex flex-column justify-content-between p-3">
                  <div className="d-flex justify-content-between align-items-center">
                    <div className="text-small">
                      <span className="badge bg-light text-dark">
                        Rating: {recipe.rating || "N/A"}
                      </span>
                    </div>
                    <Button
                      variant="link"
                      className="p-0 text-white"
                      onClick={() => handleFavoriteToggle(recipe._id)}
                    >
                      {recipe.isFavorite ? (
                        <AiFillStar size={24} />
                      ) : (
                        <AiOutlineStar size={24} />
                      )}
                    </Button>
                  </div>

                  <div className="mt-auto">
                    <Card.Title className="mb-1">{recipe.title}</Card.Title>
                    <Card.Text className="text-small text-truncate">
                      {recipe.description.substring(0, 60)}...
                    </Card.Text>
                  </div>
                </Card.ImgOverlay>
              </Card>
            </Col>
          ))
        ) : (
          <p style={{ color: "white" }}>No recipes found.</p>
        )}
      </Row>
    </Container>
  );
};

export default Recipes;
