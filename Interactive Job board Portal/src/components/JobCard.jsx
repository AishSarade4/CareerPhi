import React from "react";
import { MapPin, Building2, Clock, Heart } from "lucide-react";
import { useJobStore } from "../store/useJobStore";

export const JobCard = ({ job, onClick }) => {
  const { isFavorite, addFavorite, removeFavorite } = useJobStore();
  const favorite = isFavorite(job.id);

  return (
    <div onClick={onClick}>
      <div>
        <div>
          <h3>{job.title}</h3>
          <div>
            <Building2 size={16} className="mr-2" />
            <span>{job.company}</span>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <MapPin size={16} className="mr-2" />
            <span>
              {job.location.city}, {job.location.country}
            </span>
          </div>
          <div className="flex items-center mt-2 text-gray-600">
            <Clock size={16} className="mr-2" />
            <span>{job.type}</span>
          </div>
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            favorite ? removeFavorite(job.id) : addFavorite(job);
          }}
        >
          <Heart size={20} fill={favorite ? "currentColor" : "none"} />
        </button>
      </div>
      <div>
        <span>{job.salary}</span>
      </div>
    </div>
  );
};
