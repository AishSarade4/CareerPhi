import { useQuery } from '@tanstack/react-query';
import { searchJobs } from '../services/jobService';

export const useJobSearch = (searchQuery, filters) => {
  return useQuery({
    queryKey: ['jobs', searchQuery, filters],
    queryFn: () => searchJobs(searchQuery, filters),
  });
};