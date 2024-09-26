import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../actions/recipeActions";
import { Card, Button, Container } from "react-bootstrap";
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
    <Container className="masonry-container">
      {hasResults(recipes) ? (
        recipes.map((recipe) => (
          <div key={recipe._id} className="masonry-item">
            <Card className="h-100 position-relative text-white">
              <Card.Img
                src={recipe.thumbnail || "https://via.placeholder.com/150"}
                alt={recipe.title}
                className="card-image"
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
                    onClick={(e) => {
                      e.preventDefault();
                      handleFavoriteToggle(recipe._id);
                    }}
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
          </div>
        ))
      ) : (
        <p style={{ color: "#fff" }}>No recipes found.</p>
      )}
    </Container>
  );
};

export default Recipes;
