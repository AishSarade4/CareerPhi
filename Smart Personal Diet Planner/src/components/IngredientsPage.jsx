// src/components/IngredientsPage.js

import React, { useState } from 'react';

const IngredientsPage = ({ history }) => {
  const [ingredient, setIngredient] = useState('');
  const [ingredients, setIngredients] = useState([]);

  const onAddIngredient = () => {
    if (ingredient) {
      setIngredients([...ingredients, ingredient]);
      setIngredient('');
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    // Handle submission, like saving to state or API
    history.push('/meal-recommendations');
  };

  return (
    <div className="container">
      <h2>Ingredients on Hand</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Enter ingredients you have:</label>
          <input type="text" value={ingredient} onChange={e => setIngredient(e.target.value)} className="form-control" />
          <button type="button" onClick={onAddIngredient} className="btn btn-secondary mt-2">+ Add Ingredient</button>
        </div>
        <div className="form-group">
          <h4>Your Ingredients:</h4>
          {ingredients.map((item, index) => (
            <span key={index} className="badge badge-info mr-2">{item}</span>
          ))}
        </div>
        <button type="submit" className="btn btn-primary">Generate Meals</button>
      </form>
    </div>
  );
};

export default IngredientsPage;
