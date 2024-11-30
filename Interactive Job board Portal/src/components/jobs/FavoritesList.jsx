import React from "react";
import { useJobStore } from "../../store/useJobStore";
import { JobCard } from "./JobCard";

export const FavoritesList = ({ onJobSelect }) => {
  const { favoriteJobs } = useJobStore();

  if (favoriteJobs.length === 0) {
    return (
      <div>
        <p>No favorite jobs yet. Click the heart icon on any job to save it!</p>
      </div>
    );
  }

  return (
    <div>
      {favoriteJobs.map((job) => (
        <JobCard key={job.id} job={job} onClick={() => onJobSelect(job)} />
      ))}
    </div>
  );
};
