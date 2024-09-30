import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Carousel, Spinner } from "react-bootstrap";
import { FaStar, FaRegStar } from "react-icons/fa";
import "./Landingpage.css";
import { fetchRecipes } from "../../actions/recipeActions";
import { fetchBlogs } from "../../actions/blogActions";
import { fetchVideos } from "../../actions/videoActions";
import bannerImg from "../../BANNER_FINAL_3.png";

const LandingPage = () => {
  const [favorites, setFavorites] = useState({}); // State to store favorite items by ID
  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);
  const { videos = [], loading: videoLoading } = videoList;

  const recipeList = useSelector((state) => state.recipeList);
  const { recipes = [], loading: recipeLoading } = recipeList;

  const blogList = useSelector((state) => state.blogList);
  const { blogs = [], loading: blogLoading } = blogList;

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchRecipes());
    dispatch(fetchBlogs());
  }, [dispatch]);

  const recentVideos = [...videos].reverse().slice(0, 3);
  const recentRecipes = [...recipes].slice(0, 8);
  const recentBlogs = [...blogs].slice(0, 8);

  const handleFavoriteToggle = (id, type) => {
    setFavorites((prevFavorites) => ({
      ...prevFavorites,
      [id]: !prevFavorites[id], // Toggle the favorite state for the specific item by ID
    }));
    console.log(`Toggled favorite for ${type} with ID:`, id);
  };

  const truncateText = (text, maxLength) => {
    return text.length > maxLength
      ? `${text.substring(0, maxLength)}...`
      : text;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="landing-page">
      <img src={bannerImg} alt="Banner" className="banner-image" />
      <h1>Welcome to Udta Rasoiya</h1>
      <p>
        Your go-to place for delicious vegan Indian recipes, blogs, and videos.
      </p>
      <p>Explore our rich collection and find your next favorite dish!</p>

      {/* Recent Videos */}
      <div className="section">
        <h2 className="section-title">Most Recent Videos</h2>
        {videoLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : recentVideos.length === 0 ? (
          <p className="coming-soon">Coming Soon!</p>
        ) : (
          <Carousel className="custom-carousel">
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
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        )}
      </div>

      <hr className="section-divider" />

      {/* Recent Recipes */}
      <div className="section">
        <h2 className="section-title">Most Recent Recipes</h2>
        {recipeLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : recentRecipes.length === 0 ? (
          <p className="coming-soon">Coming Soon!</p>
        ) : (
          <div className="card-container">
            {recentRecipes.map((recipe) => (
              <Card key={recipe._id} className="recipe-card">
                <Card.Body>
                  <Card.Title>{recipe.title}</Card.Title>
                  <Card.Text>{truncateText(recipe.description, 100)}</Card.Text>
                  <Button
                    href={`/recipes/${recipe._id}`}
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
                    {favorites[recipe._id] ? (
                      <FaStar color="gold" size={24} />
                    ) : (
                      <FaRegStar color="gold" size={24} />
                    )}
                  </Button>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </div>

      <hr className="section-divider" />

      {/* Recent Blogs */}
      <div className="section">
        <h2 className="section-title">Most Recent Blogs</h2>
        {blogLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : recentBlogs.length === 0 ? (
          <p className="coming-soon">Coming Soon!</p>
        ) : (
          <div className="card-container">
            {recentBlogs.map((blog) => (
              <Card key={blog._id} className="blog-card">
                <div className="blog-image-overlay">
                  <Card.Img
                    variant="top"
                    src={blog.image}
                    className="blog-image"
                  />
                  <div className="image-overlay-content">
                    <h3>{blog.title}</h3>
                  </div>
                </div>
                <Card.Body>
                  <Card.Text>{truncateText(blog.content, 150)}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center">
                  <span>{formatDate(blog.date)}</span>
                  <div className="footer-button">
                    <Button
                      href={`/blogs/${blog._id}`}
                      rel="noopener noreferrer"
                    >
                      Read Blog
                    </Button>
                    <Button
                      variant="link"
                      className="p-0"
                      onClick={() => handleFavoriteToggle(blog._id, "blog")}
                    >
                      {favorites[blog._id] ? (
                        <FaStar color="gold" size={24} />
                      ) : (
                        <FaRegStar color="gold" size={24} />
                      )}
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default LandingPage;
