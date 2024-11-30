// src/components/MealRecommendations.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MealRecommendations = () => {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    const fetchMeals = async () => {
      // Example API call to Spoonacular
      const res = await axios.get('https://api.spoonacular.com/recipes/random', {
        params: { number: 3, apiKey: 'YOUR_SPOONACULAR_API_KEY' },
      });
      setMeals(res.data.recipes);
    };

    fetchMeals();
  }, []);

  return (
    <div className="container">
      <h2>Your Personalized Meal Plan</h2>
      {meals.map(meal => (
        <div key={meal.id} className="card my-3">
          <h3 className="card-header">{meal.title}</h3>
          <div className="card-body">
            <p>Calories: {meal.nutrition.nutrients[0].amount} kcal</p>
            <p>Protein: {meal.nutrition.nutrients[1].amount} g</p>
            <p>Carbs: {meal.nutrition.nutrients[2].amount} g</p>
            <button className="btn btn-primary">View Recipe</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealRecommendations;
