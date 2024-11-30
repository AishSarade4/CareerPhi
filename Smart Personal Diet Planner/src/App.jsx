// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ProfileForm from './components/ProfileForm';
import IngredientsPage from './components/IngredientsPage';
import MealRecommendations from './components/MealRecommendations';
import ProgressTracker from './components/ProgressTracker';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/" exact component={LandingPage} />
          <Route path="/signup" component={ProfileForm} />
          <Route path="/ingredients" component={IngredientsPage} />
          <Route path="/meal-recommendations" component={MealRecommendations} />
          <Route path="/progress-tracker" component={ProgressTracker} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
