import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from './Navigation';
import './Categories.css';

const Categories = () => {
  const [categories, setCategories] = useState([]); 
  const [newCategory, setNewCategory] = useState(''); 
  const [errors, setErrors] = useState({}); 
  const [successMessage, setSuccessMessage] = useState(''); 


  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/categories', {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          },
        });

        setCategories(response.data.data); 
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []); 


  const handleAddCategory = async (e) => {
    e.preventDefault();

  
    if (!newCategory.trim()) {
      setErrors({ category: 'Naziv kategorije je obavezan' });
      return;
    }

    const categoryData = { name: newCategory };

    try {

      const response = await axios.post('http://127.0.0.1:8000/api/categories', categoryData, {
        headers: {
          'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
        }
      }); 

      
      setCategories((prevCategories) => [...prevCategories, response.data.data]);
      setNewCategory('');
      setErrors({});
      setSuccessMessage('Kategorija uspešno dodata!');

    } catch (error) {
      if (error.response && error.response.status === 422) {
        setErrors({ category: 'name kategorije mora biti jedinstven' });
      } else {
        setErrors({ category: 'Došlo je do greške pri dodavanju kategorije' });
      }

      setSuccessMessage('');
    }
  };

  
  const handleDeleteCategory = async (categoryId) => {
    if (window.confirm('Da li ste sigurni da želite da obrišete ovu kategoriju?')) {
      try {
       
        await axios.delete(`http://127.0.0.1:8000/api/categories/${categoryId}`, {
          headers: {
            'Authorization': 'Bearer ' + window.sessionStorage.getItem('auth_token'),
          }
        });

       
        setCategories(categories.filter((category) => category.id !== categoryId));
        setSuccessMessage('Kategorija uspešno obrisana!');
      } catch (error) {
        console.error('Error deleting category:', error);
      }
    }
  };

  return (
    <div className="kategorije-page">
    
      <Navigation/>

      
      <div className="categories-container">
        <h2>Kategorije</h2>

       
        {errors.category && <div style={{ color: 'red' }}>{errors.category}</div>}
        {successMessage && <div style={{ color: 'green' }}>{successMessage}</div>}

     
        <ul className="categories-list">
          {categories.length > 0 ? (
            categories.map((category) => (
              <li key={category.id} className="category-item">
                <span>{category.name}</span>
                <button
                  className="btn delete-btn"
                  onClick={() => handleDeleteCategory(category.id)}
                >
                  Obriši
                </button>
              </li>
            ))
          ) : (
            <p>Nemate kategorija još uvek.</p>
          )}
        </ul>

       
        <form onSubmit={handleAddCategory} className="add-category-form">
          <div>
            <input
              type="text"
              placeholder="Dodajte novu kategoriju"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
          
            />
            <button type="submit" className="btn add-btn">
              Dodaj
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Categories;
