import React from 'react';
import { MapPin, Building2, Clock, Heart } from 'lucide-react';
import { useJobStore } from '../../store/useJobStore';

export const JobCard = ({ job, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useJobStore();
  const favorite = isFavorite(job.id);

  return (
    <div className="job-card" onClick={onClick}>
      <div className="job-card-header">
        <div>
          <h3 className="job-title">{job.title}</h3>
          <div className="job-info">
            <Building2 size={16} />
            <span>{job.company}</span>
          </div>
          <div className="job-info">
            <MapPin size={16} />
            <span>{job.location.city}, {job.location.country}</span>
          </div>
          <div className="job-info">
            <Clock size={16} />
            <span>{job.type}</span>
          </div>
        </div>
        <button
          className={`favorite-btn ${favorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            favorite ? removeFavorite(job.id) : addFavorite(job);
          }}
        >
          <Heart size={20} fill={favorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      <div className="job-salary">{job.salary}</div>
      <div className="job-tags">
        {job.requirements.slice(0, 3).map((req, index) => (
          <span key={index} className="job-tag">{req}</span>
        ))}
      </div>
    </div>
  );
};