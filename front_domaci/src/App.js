import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Podcast from './Components/Podcast';
import FavoritesPage from './Components/Favorites';
import Korisnici from './Components/Users';
import Kategorije from './Components/Categories';
import MyAccount from './Components/MyAccount';
import AddPodcast from './Components/AddPodcast';
import PodcastDetails from './Components/PodcastDetails';
function App() {
  return (
    
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/registracija" element={<Register />}/>
          <Route path="/podkasti" element={<Podcast />}/>
          <Route path="/omiljeni-podkasti" element={<FavoritesPage />}/>
          <Route path="/korisnici" element={<Korisnici />}/>
          <Route path="/kategorije" element={<Kategorije />}/>
          <Route path="/my-account" element={<MyAccount />}/>
          <Route path="/add-podcast" element={<AddPodcast />}/>
            <Route path="/podcast/:podcastId" element={<PodcastDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
