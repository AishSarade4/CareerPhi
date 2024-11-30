import React from 'react';

export const JobFilters = ({ onFilterChange }) => {
  return (
    <div className="filters">
      <select onChange={(e) => onFilterChange({ type: e.target.value })}>
        <option value="">All Types</option>
        <option value="Full-time">Full-time</option>
        <option value="Part-time">Part-time</option>
        <option value="Contract">Contract</option>
      </select>

      <input
        type="text"
        placeholder="Filter by location..."
        onChange={(e) => onFilterChange({ location: e.target.value })}
      />
    </div>
  );
};