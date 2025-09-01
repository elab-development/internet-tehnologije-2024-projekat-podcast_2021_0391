import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import Login from './Components/Login';
import Register from './Components/Register';
import Podcast from './Components/Podcast';
import FavoritesPage from './Components/Favorites';
import Korisnici from './Components/Users';
import Kategorije from './Components/Categories';
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
