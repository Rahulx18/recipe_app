import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./SearchOverlay.css";
import { searchQuery } from "../actions/searchActions";
import { Accordion } from "react-bootstrap";
import { FaTimesCircle } from "react-icons/fa";

const SearchOverlay = ({ Close }) => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);
  const [showOverlay, setShowOverlay] = useState(true);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setShowOverlay(false);
        Close();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [Close]);

  useEffect(() => {
    if (query === "") {
      dispatch(searchQuery(""));
    }
  }, [query, dispatch]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    if (value) {
      dispatch(searchQuery(value));
    }
  };

  const hasResults = (results) => results && results.length > 0;

  return (
    <>
      {showOverlay && (
        <div className="search-overlay__overlay">
          <div className="search-overlay__container">
            <div className="search-overlay__input-container">
              <input
                type="text"
                className="search-overlay__input"
                value={query}
                onChange={handleInputChange}
                placeholder="Search..."
                ref={inputRef}
              />
            </div>

            <div className="search-overlay__results-container">
              <Accordion>
                {hasResults(searchResults.recipes) && (
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>
                      Recipes ({searchResults.recipes.length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {searchResults.recipes.map((recipe) => (
                        <div key={recipe._id} className="search-overlay__item">
                          <strong className="search-overlay__item-title">
                            {recipe.title}
                          </strong>
                          <p className="search-overlay__item-description">
                            {recipe.description}
                          </p>
                          <a
                            className="search-overlay__item-link"
                            href={`/recipe/${recipe._id}`}
                          >
                            View Recipe
                          </a>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )}

                {hasResults(searchResults.blogs) && (
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>
                      Blogs ({searchResults.blogs.length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {searchResults.blogs.map((blog) => (
                        <div key={blog._id} className="search-overlay__item">
                          <strong className="search-overlay__item-title">
                            {blog.title}
                          </strong>
                          <p className="search-overlay__item-description">
                            {blog.content}
                          </p>
                          <a
                            className="search-overlay__item-link"
                            href={`/blogs/${blog._id}`}
                          >
                            Read Blog
                          </a>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )}

                {hasResults(searchResults.videos) && (
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>
                      Videos ({searchResults.videos.length})
                    </Accordion.Header>
                    <Accordion.Body>
                      {searchResults.videos.map((video) => (
                        <div key={video._id} className="search-overlay__item">
                          <strong className="search-overlay__item-title">
                            {video.title}
                          </strong>
                          <p className="search-overlay__item-description">
                            {video.description}
                          </p>
                          <a
                            className="search-overlay__item-link"
                            href={`/videos/${video._id}`}
                          >
                            Watch Video
                          </a>
                        </div>
                      ))}
                    </Accordion.Body>
                  </Accordion.Item>
                )}
              </Accordion>
            </div>
            <button className="search-overlay__close-button" onClick={Close}>
              <FaTimesCircle className="search-overlay__close-icon" />
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default SearchOverlay;
