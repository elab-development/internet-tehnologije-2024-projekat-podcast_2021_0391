import React, { useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Navigation from "./Navigation";
import "./PodcastDetails.css";
import useRole from "./UseRole";

const PodcastDetails = () => {
  const navigate = useNavigate();
  const { podcastId } = useParams(); 
  const { state } = useLocation(); 
  const [isFavorite, setIsFavorite] = useState(false);

  const podcast = state?.podcast || {
    id: podcastId,
    title: "Podkast nije pronađen",
    category: "Nepoznato",
    description: "Ovaj podkast nije dostupan.",
    image: "https://via.placeholder.com/500x300?text=No+Podcast+Image",
    episodes: [],
  };

  const {role} = useRole();

  const handleEpisodeClick = (episodeId, episodeTitle, episodeDescription) => {
    navigate(`/podcast/${podcastId}/episode/${episodeId}`, {
      state: { title: episodeTitle, description: episodeDescription },
    });
  };
  

  const handleAddEpisodeClick = () => {
    navigate(`/podcast/${podcastId}/add-episode`);
  };

  const handleDeletePodcast = () => {
    if (window.confirm("Da li ste sigurni da želite da obrišete ovaj podkast?")) {
      console.log(`Podkast sa ID-jem ${podcastId} je obrisan.`);
      navigate("/podkasti"); 
    }
  };

  const handleAddToFavorites = () => {
    setIsFavorite(!isFavorite);
    console.log(
      isFavorite ? `Podkast sa ID-jem ${podcastId} je uklonjen iz omiljenih.` : `Podkast sa ID-jem ${podcastId} je dodat u omiljene.`
    );
  };

  return (
    <div className="podcast-details">
      <Navigation />
      <div className="podcast-details-info">
        <img
          src={podcast.image}
          alt={podcast.title}
          className="podcast-details-banner"
        />
        <h1 className="podcast-details-title">{podcast.title}</h1>
        <p className="podcast-details-category">
          Kategorija: {podcast.category}
        </p>
        <p className="podcast-details-description">{podcast.description}</p>
        <div className="podcast-actions">
          {role === "admin" && (
            <button
              className="btn delete-podcast-btn"
              onClick={handleDeletePodcast}
            >
              Obriši Podkast
            </button>
          )}

          {role === "creator" && (
            <>
              <button
                className="btn add-episode-btn"
                onClick={handleAddEpisodeClick}
              >
                Dodaj Epizodu
              </button>
              <button
                className="btn delete-podcast-btn"
                onClick={handleDeletePodcast}
              >
                Obriši Podkast
              </button>
            </>
          )}

          {role === "viewer" && (
            <button
              className={`btn favorite-btn ${isFavorite ? "favorite-added" : ""}`}
              onClick={handleAddToFavorites}
            >
              {isFavorite ? "Ukloni iz omiljenih" : "Dodaj u omiljene"}
            </button>
          )}
        </div>
      </div>
      <div className="episodes-list">
        <h2>Epizode</h2>
        {podcast.episodes.length === 0 ? (
          <p>Ovaj podkast trenutno nema epizoda.</p>
        ) : (
          podcast.episodes.map((episode) => (
            <div
              key={episode.id}
              className="episode-card"
              onClick={() => handleEpisodeClick(episode.id, episode.title, episode.description)}
            >
              <h3>{episode.title}</h3>
              <p>{episode.description}</p>
              <button className="btn">Idi na epizodu</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PodcastDetails;
