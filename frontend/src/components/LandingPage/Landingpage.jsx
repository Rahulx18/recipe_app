import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Carousel } from "react-bootstrap";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import "./Landingpage.css";
import { fetchRecipes } from "../../actions/recipeActions";
import { fetchBlogs } from "../../actions/blogActions";
import { fetchVideos } from "../../actions/videoActions";

const LandingPage = () => {
  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);
  const { videos } = videoList;

  const recipeList = useSelector((state) => state.recipeList);
  const { recipes } = recipeList;

  const blogList = useSelector((state) => state.blogList);
  const { blogs } = blogList;

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchRecipes());
    dispatch(fetchBlogs());
  }, [dispatch]);

  const recentVideos = videos.slice(0, 3);
  const recentRecipes = recipes.slice(0, 8);
  const recentBlogs = blogs.slice(0, 8);

  const handleFavoriteToggle = (id, type) => {
    console.log(`Toggled favorite for ${type} with ID:`, id);
  };

  return (
    <div className="landing-page">
      <h1>Welcome to FOOD</h1>
      <p>
        Your go-to place for delicious vegan Indian recipes, blogs, and videos.
      </p>
      <p>Explore our rich collection and find your next favorite dish!</p>

      <div className="section">
        <h2 className="section-title">Most Recent Videos</h2>
        <Carousel controls={true} indicators={false} interval={null}>
          {recentVideos.map((video) => (
            <Carousel.Item key={video._id}>
              <div className="video-item">
                <div
                  className="embed-container"
                  dangerouslySetInnerHTML={{ __html: video.embedCode }}
                />
                <div className="video-description">
                  <h3>{video.title}</h3>
                  <p>{video.description}</p>
                </div>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <Button
                    href={`/video/${video._id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Watch Video
                  </Button>
                  <Button
                    variant="link"
                    className="p-0"
                    onClick={() => handleFavoriteToggle(video._id, "video")}
                  >
                    <AiOutlineStar size={24} />
                  </Button>
                </Card.Footer>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </div>

      <hr className="section-divider" />

      <div className="section">
        <h2 className="section-title">Most Recent Recipes</h2>
        <div className="card-container">
          {recentRecipes.map((recipe) => (
            <Card key={recipe._id} className="recipe-card">
              <Card.Body>
                <Card.Title>{recipe.title}</Card.Title>
                <Card.Text>{recipe.description}</Card.Text>
                <Button
                  href={`/recipe/${recipe._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Recipe
                </Button>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <span>{recipe.date}</span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => handleFavoriteToggle(recipe._id, "recipe")}
                >
                  <AiOutlineStar size={24} />
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>

      <hr className="section-divider" />

      <div className="section">
        <h2 className="section-title">Most Recent Blogs</h2>
        <div className="card-container">
          {recentBlogs.map((blog) => (
            <Card key={blog._id} className="blog-card">
              <Card.Body>
                <Card.Title>{blog.title}</Card.Title>
                <Card.Text>{blog.content}</Card.Text>
                <Button
                  href={`/blog/${blog._id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Read Blog
                </Button>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <span>{blog.date}</span>
                <Button
                  variant="link"
                  className="p-0"
                  onClick={() => handleFavoriteToggle(blog._id, "blog")}
                >
                  <AiOutlineStar size={24} />
                </Button>
              </Card.Footer>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
