import React from 'react';
import { SearchBar } from './SearchBar';
import { JobFilters } from './JobFilters';

export const SearchSection = ({ searchQuery, onSearchChange, onFilterChange }) => {
  return (
    <div>
      <div>
        <SearchBar value={searchQuery} onChange={onSearchChange} />
      </div>
      <JobFilters onFilterChange={onFilterChange} />
    </div>
  );
};