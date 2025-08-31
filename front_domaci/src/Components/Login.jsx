import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import useRole from './UseRole';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useRole();

  const handleLogin = (event) => {
    event.preventDefault();

    if (email === 'jovana.lazic@example.com' && password === '1234') { 
      setRole('admin');
      navigate('/podkasti');
    
    } else if (email === 'kristina.lekic@example.com' && password === '1234') {      
      setRole('creator');  
      navigate('/podkasti'); 

    } else {
      setRole('viewer');  
      navigate('/podkasti');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="login-title">Dobrodošli na Podcast Platformu</h1>
        <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              id="email"
              className="form-input"
              placeholder="Unesite vaš email"
              value={email}
              onChange={(e) => setEmail(e.target.value)} 
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password" className="form-label">Šifra</label>
            <input
              type="password"
              id="password"
              className="form-input"
              placeholder="Unesite vašu šifru"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-button">Prijavi se</button>
        </form>
        <p className="register-link">
          Novi ste? <a href="/registracija">Registrujte se ovde</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
