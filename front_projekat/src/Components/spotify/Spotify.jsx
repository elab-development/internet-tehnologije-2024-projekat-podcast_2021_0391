import React, { useState } from 'react';
import './Spotify.css';
import SearchBar from './SearchBar';
import ArtistList from './ArtistList';
import ArtistDetails from './ArtistDetails';
import { searchArtists, getArtistTopTracks } from './SpotifyService';
import Navigation from '../Navigation';

const Spotify = () => {
  const [artists, setArtists] = useState([]);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [songs, setSongs] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const songsPerPage = 10;


  const handleSearch = async (query) => {
    const artists = await searchArtists(query);
    setArtists(artists);
    setSelectedArtist(null);
    setSongs([]);  
    setCurrentPage(1);  
  };


  const handleSelectArtist = async (artist) => {
    const tracks = await getArtistTopTracks(artist.id);
    setSelectedArtist(artist);
    setSongs(tracks);  
    setCurrentPage(1); 
  };

  return (
    <>
    <Navigation/>
    <div className="app">
   
    
      <SearchBar onSearch={handleSearch} />

    
      {selectedArtist ? (
        <div className="artist-details-container">
          
          <div className="artist-profile">
            <img 
              src={selectedArtist.images[0]?.url} 
              alt={selectedArtist.name} 
              className="artist-photo" 
            />
            <h3 className="artist-name">{selectedArtist.name}</h3>
          </div>
          
        
          <ArtistDetails 
            artist={selectedArtist} 
            songs={songs} 
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            songsPerPage={songsPerPage}
          />
        </div>
      ) : (
        <ArtistList artists={artists} onSelect={handleSelectArtist} />
      )}
    </div>
    </>
  );
};

export default Spotify;
