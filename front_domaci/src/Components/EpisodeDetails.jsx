import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import Navigation from './Navigation';
import './EpisodeDetails.css';

const EpisodeDetails = () => {
  const { episodeId } = useParams();
  const { state } = useLocation(); 

  const episodeTitle = state?.title || "Epizoda nije pronađena";
  const episodeDescription = state?.description || "Opis nije dostupan.";
  const episodeType = state?.type || "audio"; 
  const episodeContentUrl = state?.contentUrl || "https://www.example.com/sample-audio.mp3";


  return (
    <div className="episode-details">
      <Navigation />
      <div className="episode-info">
        <h1>{episodeTitle}</h1>
        <p>{episodeDescription}</p>

        <div className="media-container">
          {episodeType === "video" ? (
            <video controls className="media-player">
              <source src={episodeContentUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <audio controls className="media-player">
              <source src={episodeContentUrl} type="audio/mpeg" />
              Your browser does not support the audio tag.
            </audio>
          )}
        </div>
      </div>
    </div>
  );
};

export default EpisodeDetails;
