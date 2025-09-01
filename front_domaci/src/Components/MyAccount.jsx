import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './Navigation';
import './MyAccount.css';

const MyAccount = () => {
  const navigate = useNavigate();
  const userInfo = {
    username: "kristina2002",
    email: "kristina.lekic@example.com",
    profileImage: "https://via.placeholder.com/150?text=Profilna+Slika",
  };

  const [profileImage, setProfileImage] = useState(userInfo.profileImage);
  const [isImageUploading, setIsImageUploading] = useState(false);

  const fileInputRef = useRef(null);

  const podcasts = [
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
  ];

  const handleAddPodcast = () => {
    navigate('/add-podcast');
  };

  const handlePodcastClick = (podcast) => {
    navigate(`/podcast/${podcast.id}`, { state: { podcast } });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsImageUploading(true);
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
        setIsImageUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="my-account">
      <Navigation />
      <div className="account-info">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <div className="user-details">
          <h2>{userInfo.username}</h2>
          <p>Email: {userInfo.email}</p>
          <button className="btn upload-btn" onClick={handleProfileImageClick}>
            {isImageUploading ? 'Učitavanje...' : 'Promeni Profilnu Sliku'}
          </button>
         
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{ display: 'none' }} 
          />
        </div>
      </div>

      <div className="my-podcasts-section">
        <h2>Moji Podkasti</h2>
        <button className="btn add-podcast-btn" onClick={handleAddPodcast}>
          Dodaj Novi Podcast
        </button>
        <div className="my-podcast-grid">
          {podcasts.map((podcast) => (
            <div
              key={podcast.id}
              className="my-podcast-card"
              onClick={() => handlePodcastClick(podcast)}
            >
              <img src={podcast.image} alt={podcast.title} className="my-podcast-banner" />
              <div className="my-podcast-info">
                <h3 className="my-podcast-title">{podcast.title}</h3>
                <p className="my-podcast-category">Kategorija: {podcast.category}</p>
                <p className="my-podcast-description">{podcast.description}</p>
                <p className="my-podcast-episodes">Broj epizoda: {podcast.episodes.length}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;
