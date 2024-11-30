import React, { useState } from 'react';
import { JobList } from './JobList';
import { JobMap } from './JobMap';
import { FavoritesList } from './FavoritesList';

export const JobSection = ({ jobs, isLoading, selectedJob, onJobSelect }) => {
  const [showFavorites, setShowFavorites] = useState(false);

  return (
    <div>
      <div>
        <div>
          <button className="showbtn"
            onClick={() => setShowFavorites(!showFavorites)}
          >
            {showFavorites ? 'Show All Jobs' : 'Show Favorites'}
          </button>
        </div>
        
        {isLoading ? (
          <div className="loading">Loading jobs...</div>
        ) : showFavorites ? (
          <FavoritesList onJobSelect={onJobSelect} />
        ) : (
          <JobList jobs={jobs} onJobSelect={onJobSelect} />
        )}
      </div>
      <div>
        <JobMap selectedJob={selectedJob} />
      </div>
    </div>
  );
};