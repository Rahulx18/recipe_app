import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Button, Carousel, Spinner } from "react-bootstrap";
import { AiOutlineStar } from "react-icons/ai";
import "./Landingpage.css";
import { fetchRecipes } from "../../actions/recipeActions";
import { fetchBlogs } from "../../actions/blogActions";
import { fetchVideos } from "../../actions/videoActions";
import bannerImg from "../../BANNER_FINAL_3.png";

const LandingPage = () => {
  const dispatch = useDispatch();

  const videoList = useSelector((state) => state.videoList);
  const { videos, loading: videoLoading } = videoList;

  const recipeList = useSelector((state) => state.recipeList);
  const { recipes, loading: recipeLoading } = recipeList;

  const blogList = useSelector((state) => state.blogList);
  const { blogs, loading: blogLoading } = blogList;

  useEffect(() => {
    dispatch(fetchVideos());
    dispatch(fetchRecipes());
    dispatch(fetchBlogs());
  }, [dispatch]);

  const recentVideos = videos.slice(0, 5);
  const recentRecipes = recipes.slice(0, 8);
  const recentBlogs = blogs.slice(0, 8);

  const handleFavoriteToggle = (id, type) => {
    console.log(`Toggled favorite for ${type} with ID:`, id);
  };

  return (
    <div className="landing-page">
      <img src={bannerImg} alt="Banner" className="banner-image" />
      <h1>Welcome to Udta Rasoiya</h1>
      <p>
        Your go-to place for delicious vegan Indian recipes, blogs, and videos.
      </p>
      <p>Explore our rich collection and find your next favorite dish!</p>

      <div className="section">
        <h2 className="section-title">Most Recent Videos</h2>
        {videoLoading ? (
          <div className="loading-spinner">
            <Spinner animation="border" />
          </div>
        ) : recentVideos.length === 0 ? (
          <p className="coming-soon">Coming Soon!</p>
        ) : (
          <Carousel>
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
        )}
      </div>

      <hr className="section-divider" />

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
        )}
      </div>
    </div>
  );
};

export default LandingPage;
