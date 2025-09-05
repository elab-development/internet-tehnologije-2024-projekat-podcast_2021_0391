import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Podcast from './Components/Podcast';
import FavoritesPage from './Components/Favorites';
import Users from './Components/Users';
import Categories from './Components/Categories';
import MyAccount from './Components/MyAccount';
import AddPodcast from './Components/AddPodcast';
import PodcastDetails from './Components/PodcastDetails';
import AddEpisode from './Components/AddEpisode';
import EpisodeDetails from './Components/EpisodeDetails';
import ChangeProfilePicture from './Components/ChangeProfilePicture';
function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registracija" element={<Register />}/>
          <Route path="/podkasti" element={<Podcast />}/>
          <Route path="/omiljeni-podkasti" element={<FavoritesPage />}/>
          <Route path="/korisnici" element={<Users />}/>
          <Route path="/kategorije" element={<Categories />}/>
          <Route path="/my-account" element={<MyAccount />}/>
          <Route path="/add-podcast" element={<AddPodcast />}/>
          <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
          <Route path="/podcast/:podcastId/add-episode" element={<AddEpisode />} />
           <Route path="/podcast/:podcastId/episode/:episodeId" element={<EpisodeDetails />} />
             <Route path="/my-account/change-profile-picture" element={<ChangeProfilePicture/>}/>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
