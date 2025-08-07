import React from "react";
import Image from "next/image";
import { MovieDetails } from "../types";

interface MovieDetailsModalProps { 
  movie: MovieDetails; 
  onClose: () => void; 
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  const hasValidPoster = movie.Poster && movie.Poster !== "N/A";

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white p-6 rounded w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-shrink-0">
            {hasValidPoster ? (
              <div className="relative w-40 h-60">
                <Image 
                  src={movie.Poster} 
                  alt={movie.Title} 
                  fill
                  className="rounded object-cover"
                  sizes="160px"
                />
              </div>
            ) : (
              <div className="w-40 h-60 bg-gradient-to-br from-gray-300 to-gray-400 rounded flex items-center justify-center">
                <div className="text-center p-4">
                  <div className="text-4xl mb-2">🎬</div>
                  <div className="text-xs text-gray-600 font-medium break-words">
                    {movie.Title}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold mb-4">{movie.Title}</h2>
            <div className="space-y-2">
              {movie.Released && <p><span className="font-semibold">Released:</span> {movie.Released}</p>}
              {movie.Genre && <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>}
              {movie.Director && <p><span className="font-semibold">Director:</span> {movie.Director}</p>}
              {movie.Actors && <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>}
              {movie.imdbRating && <p><span className="font-semibold">IMDB Rating:</span> {movie.imdbRating}</p>}
              {movie.Runtime && <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>}
              {movie.Plot && <p><span className="font-semibold">Plot:</span> {movie.Plot}</p>}
            </div>
          </div>
        </div>
        <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default MovieDetailsModal;