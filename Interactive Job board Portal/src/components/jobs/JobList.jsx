import React from 'react';
import { JobCard } from './JobCard';

export const JobList = ({ jobs, onJobSelect }) => {
  return (
    <div className="space-y-4">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobSelect(job)} />
      ))}
    </div>
  );
};