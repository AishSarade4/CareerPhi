// src/components/ProfileForm.js

import React, { useState } from 'react';

const ProfileForm = ({ history }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: '',
    height: '',
    weight: '',
    dietaryPreferences: [],
    fitnessGoal: '',
  });

  const { name, age, gender, height, weight, dietaryPreferences, fitnessGoal } = formData;

  const onChange = e => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const onCheckBoxChange = e => {
    if (dietaryPreferences.includes(e.target.value)) {
      setFormData({
        ...formData,
        dietaryPreferences: dietaryPreferences.filter(pref => pref !== e.target.value),
      });
    } else {
      setFormData({
        ...formData,
        dietaryPreferences: [...dietaryPreferences, e.target.value],
      });
    }
  };

  const onSubmit = e => {
    e.preventDefault();
    // Redirect to next page (ingredients input)
    history.push('/ingredients');
  };

  return (
    <div className="container">
      <h2>Create Your Profile</h2>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={onChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Age:</label>
          <input type="number" name="age" value={age} onChange={onChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Gender:</label>
          <select name="gender" value={gender} onChange={onChange} required className="form-control">
            <option value="">Select</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
          </select>
        </div>
        <div className="form-group">
          <label>Height (cm):</label>
          <input type="number" name="height" value={height} onChange={onChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Weight (kg):</label>
          <input type="number" name="weight" value={weight} onChange={onChange} required className="form-control" />
        </div>
        <div className="form-group">
          <label>Dietary Preferences:</label><br />
          <input type="checkbox" value="vegetarian" onChange={onCheckBoxChange} /> Vegetarian
          <input type="checkbox" value="vegan" onChange={onCheckBoxChange} /> Vegan
          <input type="checkbox" value="keto" onChange={onCheckBoxChange} /> Keto
        </div>
        <div className="form-group">
          <label>Fitness Goal:</label><br />
          <input type="radio" name="fitnessGoal" value="lose_weight" onChange={onChange} /> Lose Weight
          <input type="radio" name="fitnessGoal" value="gain_muscle" onChange={onChange} /> Gain Muscle
          <input type="radio" name="fitnessGoal" value="maintain" onChange={onChange} /> Maintain
        </div>
        <button type="submit" className="btn btn-primary">Next: Ingredients</button>
      </form>
    </div>
  );
};

export default ProfileForm;
