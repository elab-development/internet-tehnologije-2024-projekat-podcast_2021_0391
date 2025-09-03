import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navigation from "./Navigation";
import "./Podcast.css";

const Podcast = () => {
  const [categories, setCategories] = useState([]); 
  const [podcasts, setPodcasts] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const authHeader = {
    headers: {
      Authorization: "Bearer " + window.sessionStorage.getItem("auth_token"),
    },
  };


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8000/api/categories", authHeader);
        setCategories([{ id: null, name: "Sve" }, ...response.data.data]);
      } catch (error) {
        console.error("Greška pri učitavanju kategorija:", error);
      }
    };

    fetchCategories();
  }, []); 


  const fetchPodcasts = async (categoryId = selectedCategoryId, page = currentPage) => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/podcasts", {
        ...authHeader,
        params: {
          category_id: categoryId,
          page: page,
          per_page: 10, 
        },
      });
      setPodcasts(response.data.data);
      setTotalPages(response.data.meta.last_page);
    } catch (error) {
      console.error("Greška pri učitavanju podkasta:", error);
    }
  };


  useEffect(() => {
    fetchPodcasts(selectedCategoryId, currentPage);
  }, [selectedCategoryId, currentPage]);


  const handleCategoryClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    setCurrentPage(1); 
  };


  const handlePodcastClick = (podcastId) => {
    navigate(`/podcast/${podcastId}`);
  };

  return (
    <div className="homepage">
      <Navigation />
      <div className="content-wrapper">
        <aside className="filter-sidebar">
          <h2>Kategorije</h2>
          <ul className="filter-list">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                className={`filter-item ${
                  selectedCategoryId === category.id ? "active" : ""
                }`}
              >
                {category.name}
              </li>
            ))}
          </ul>
        </aside>
        <main className="podcast-grid">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="podcast-card"
              onClick={() => handlePodcastClick(podcast.id)}
            >
              <img
                src={podcast.banner}
                alt={podcast.title}
                className="podcast-banner"
              />
              <h3 className="podcast-title">{podcast.title}</h3>
              <p className="podcast-category">{podcast.category?.name || 'nepoznato'}</p>
              <p className="podcast-description">{podcast.description}</p>
            </div>
          ))}

      
          <div className="pagination">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            >
              &laquo; Prethodna
            </button>
            <span>
              Stranica {currentPage} od {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            >
              Sledeća &raquo;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Podcast;
