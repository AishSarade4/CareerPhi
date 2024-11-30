import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useJobStore = create(
  persist(
    (set, get) => ({
      favoriteJobs: [],
      addFavorite: (job) =>
        set((state) => ({
          favoriteJobs: [...state.favoriteJobs, job],
        })),
      removeFavorite: (jobId) =>
        set((state) => ({
          favoriteJobs: state.favoriteJobs.filter((job) => job.id !== jobId),
        })),
      isFavorite: (jobId) =>
        get().favoriteJobs.some((job) => job.id === jobId),
    }),
    {
      name: 'job-storage',
    }
  )
);