import React, { useState } from "react";
import Image from "next/image";
import { MovieSearchResult } from "../types";

interface MovieCardProps { 
  movie: MovieSearchResult; 
  onClick: () => void; 
}

const MovieCard: React.FC<MovieCardProps> = ({ movie, onClick }) => {
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  const hasValidPoster = movie.Poster && movie.Poster !== "N/A" && !imageError;

  return (
    <div className="shadow rounded p-2 cursor-pointer hover:scale-105 transition" onClick={onClick}>
      <div className="w-full h-60 rounded overflow-hidden relative">
        {hasValidPoster ? (
          <Image 
            src={movie.Poster}
            alt={movie.Title}
            fill
            className="object-cover"
            onError={handleImageError}
            sizes="(max-width: 640px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-xs text-gray-600 font-medium break-words">
                {movie.Title}
              </div>
            </div>
          </div>
        )}
      </div>
      <div className="mt-2">
        <h3 className="font-semibold text-sm leading-tight">{movie.Title}</h3>
        <p className="text-sm text-gray-600">{movie.Type} • {movie.Year}</p>
      </div>
    </div>
  );
};

export default MovieCard;