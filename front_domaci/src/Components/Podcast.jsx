import React, { useState } from "react";
import "./Podcast.css";
import { useNavigate } from 'react-router-dom';
import Navigation from "./Navigation";

const Podcast = () => {
  const allPodcasts = [
    { 
      id: 1, 
      title: "Music Through Time", 
      category: "Muzika", 
      description: "Razgovori o istoriji muzike i njenoj evoluciji.", 
      image: "/images/music_through_time.jpg",
      episodes: [
        { id: 1, title: "Poreklo muzike", description: "Istraživanje početaka muzike u starim civilizacijama." },
        { id: 2, title: "Klasična muzika", description: "Duboko zaranjanje u eru klasične muzike i njen uticaj." },
        { id: 3, title: "Savremeni muzički trendovi", description: "Razgovor o trenutnim trendovima u modernoj muzici." }
      ]
    },
    { 
      id: 2, 
      title: "Foodie Adventures", 
      category: "Hrana", 
      description: "Sve o hrani, receptima i kulinarskim putovanjima.", 
      image: "/images/foodie_adventures.jpg",
      episodes: [
        { id: 1, title: "Ukusi Italije", description: "Istraživanje bogate kulinarske tradicije Italije." },
        { id: 2, title: "Ulična hrana širom sveta", description: "Tasting najboljih uličnih jela iz celog sveta." },
        { id: 3, title: "Zdrava ishrana", description: "Saveti za zdravu ishranu bez kompromisa u ukusu." }
      ]
    },
    { 
      id: 3, 
      title: "Fitness Focus", 
      category: "Fitnes", 
      description: "Saveti za vežbanje i zdrav način života.", 
      image: "/images/fitness_focus.jpg",
      episodes: [
        { id: 1, title: "Fitnes za početnike", description: "Početak fitnes putovanja uz osnovne savete." },
        { id: 2, title: "Trening snage", description: "Izgradnja mišića i snage uz prave vežbe." },
        { id: 3, title: "Ishrana za fitnes", description: "Šta jesti za maksimalne rezultate u fitnesu." }
      ]
    },
    { 
      id: 4, 
      title: "Business Insights", 
      category: "Biznis", 
      description: "Diskusije o poslovnim strategijama i liderstvu.", 
      image: "/images/business_insights.jpg",
      episodes: [
        { id: 1, title: "Preduzetništvo 101", description: "Ključne lekcije za buduće preduzetnike." },
        { id: 2, title: "Liderstvo u modernom radnom okruženju", description: "Kako efikasno voditi tim u današnjem poslovnom svetu." },
        { id: 3, title: "Poslovna strategija", description: "Razvijanje pobedničke strategije za dugoročni uspeh." }
      ]
    },
    { 
      id: 5, 
      title: "Travel Diaries", 
      category: "Putovanja", 
      description: "Avanture iz celog sveta.", 
      image: "/images/travel_diaries.jpg",
      episodes: [
        { id: 1, title: "Istraživanje Evrope", description: "Vodič kroz najbolja putnička odredišta u Evropi." },
        { id: 2, title: "Avantura u Aziji", description: "Istraživanje različitih kultura i pejzaža Azije." },
        { id: 3, title: "Putovanje po SAD", description: "Ultimativni vodič za putovanje po Sjedinjenim Američkim Državama." }
      ]
    },
    { 
      id: 6, 
      title: "Book Club", 
      category: "Književnost", 
      description: "Razgovori o knjigama i autorima.", 
      image: "/images/book_club.jpg",
      episodes: [
        { id: 1, title: "Recenzija Velikog Getsbija", description: "Duboko zaranjanje u remek-delo F. Skota Ficdžeralda." },
        { id: 2, title: "Savremeni klasici", description: "Istraživanje najboljih savremenih romana." },
        { id: 3, title: "Spotlight na autora: J.K. Rowling", description: "Istraživanje dela J.K. Rowling, uključujući serijal o Hariju Poteru." }
      ]
    }
  ];
  
  const navigate = useNavigate();
  const [filteredPodcasts, setFilteredPodcasts] = useState(allPodcasts);
  const [currentPage, setCurrentPage] = useState(1);
  const podcastsPerPage = 4;
  const categories = ["Sve", "Muzika", "Hrana", "Fitnes", "Biznis", "Putovanja", "Književnost"];

  const filterPodcasts = (category) => {
    if (category === "Sve") {
      setFilteredPodcasts(allPodcasts);
    } else {
      setFilteredPodcasts(allPodcasts.filter((podcast) => podcast.category === category));
    }
    setCurrentPage(1); 
  };

  const handlePodcastClick = (podcast) => {
    navigate(`/podcast/${podcast.id}`, { state: { podcast } });
  };

  const indexOfLastPodcast = currentPage * podcastsPerPage;
  const indexOfFirstPodcast = indexOfLastPodcast - podcastsPerPage;
  const currentPodcasts = filteredPodcasts.slice(indexOfFirstPodcast, indexOfLastPodcast);

  const totalPages = Math.ceil(filteredPodcasts.length / podcastsPerPage);

  return (
    <div className="homepage">
      <Navigation />
      <div className="content-wrapper">
        <aside className="filter-sidebar">
          <h2>Kategorije</h2>
          <ul className="filter-list">
            {categories.map((category, index) => (
              <li key={index} onClick={() => filterPodcasts(category)} className="filter-item">
                {category}
              </li>
            ))}
          </ul>
        </aside>
        <main className="podcast-grid">
          {currentPodcasts.map((podcast) => (
            <div key={podcast.id} className="podcast-card" onClick={() => handlePodcastClick(podcast)}>
              <img src={podcast.image} alt={podcast.title} className="podcast-banner" />
              <h3 className="podcast-title">{podcast.title}</h3>
              <p className="podcast-category">{podcast.category}</p>
              <p className="podcast-description">{podcast.description}</p>
            </div>
          ))}
        </main>
      </div>
      <div className="pagination">
        <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>Prethodna</button>
        <span>Stranica {currentPage} od {totalPages}</span>
        <button onClick={() => setCurrentPage(currentPage + 1)} disabled={currentPage === totalPages}>Sledeća</button>
      </div>
    </div>
  );
};

export default Podcast;
