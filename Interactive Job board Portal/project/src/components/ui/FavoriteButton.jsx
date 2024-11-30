import React from 'react';
import { Heart } from 'lucide-react';

export const FavoriteButton = ({ isFavorite, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 rounded-full ${
        isFavorite ? 'text-red-500' : 'text-gray-400'
      } hover:bg-gray-100`}
    >
      <Heart size={20} fill={isFavorite ? 'currentColor' : 'none'} />
    </button>
  );
};