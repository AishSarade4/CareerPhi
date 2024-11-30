import React from 'react';
import { MapPin, Building2, Clock, Briefcase } from 'lucide-react';

export const JobCardDetails = ({ job }) => {
  return (
    <div className="flex-1">
      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
      <div className="flex items-center mt-2 text-gray-600">
        <Building2 size={16} className="mr-2" />
        <span>{job.company}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-600">
        <MapPin size={16} className="mr-2" />
        <span>{job.location.city}, {job.location.country}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-600">
        <Clock size={16} className="mr-2" />
        <span>Posted {new Date(job.postedAt).toLocaleDateString()}</span>
      </div>
      <div className="flex items-center mt-2 text-gray-600">
        <Briefcase size={16} className="mr-2" />
        <span>{job.type}</span>
      </div>
      <div className="mt-3">
        <p className="text-sm text-gray-600 line-clamp-2">{job.description}</p>
      </div>
      <div className="mt-3">
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 3).map((req, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
            >
              {req}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};