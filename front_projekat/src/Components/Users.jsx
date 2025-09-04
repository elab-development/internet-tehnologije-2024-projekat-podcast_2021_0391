import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Users.css';

const Users = () => {
  const [users, setUsers] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/users', {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
          },
        });
        setUsers(response.data.data); 
        setLoading(false); 
      } catch (err) {
        setError('Greška prilikom učitavanja korisnika'); 
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); 

 
  const handleDelete = async (userId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovog korisnika?')) {
      try {
        await axios.delete(`http://127.0.0.1:8000/api/users/${userId}`, {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'), 
          },
        });
        setUsers(users.filter((user) => user.id !== userId));
      } catch (err) {
        setError('Greška prilikom brisanja korisnika'); 
      }
    }
  };

  if (loading) {
    return <div>Učitavanje...</div>; 
  }

  return (
    <div className="korisnici-page">
      <Navigation />
      <div className="korisnici-container">
        <h2>Spisak Korisnika</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>} 
        <table className="korisnici-table">
          <thead>
            <tr>
              <th>Korisničko ime</th>
              <th>Email</th>
              <th>Uloga</th>
              <th>Akcije</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} 
              className={user.role}
              >
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.role==='viewer'?'GLEDALAC':'KREATOR'}</td>
                <td>
                  <button
                    className="btn delete-btn"
                    onClick={() => handleDelete(user.id)}
                  >
                    Obriši
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
