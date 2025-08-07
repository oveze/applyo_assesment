import React from "react";
import { MovieDetails } from "../types";

interface MovieDetailsModalProps { 
  movie: MovieDetails | null; // Allow null for loading states
  onClose: () => void; 
}

const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({ movie, onClose }) => {
  // Early return for null/undefined movie
  if (!movie) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
        <div className="bg-white p-6 rounded">
          <div className="text-center">Loading movie details...</div>
        </div>
      </div>
    );
  }

  const hasValidPoster = movie.Poster && movie.Poster !== "N/A";
  
  // Safe fallbacks for required fields
  const movieTitle = movie.Title || "Unknown Title";
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4" onClick={onClose}>
      <div className="bg-white rounded w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
        {/* Header with close button */}
        <div className="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 className="text-xl font-bold truncate pr-4">{movieTitle}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center"
            aria-label="Close modal"
            type="button"
          >
            ×
          </button>
        </div>
        
        {/* Scrollable content */}
        <div className="overflow-y-auto p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0">
              {hasValidPoster ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={movie.Poster} 
                  alt={movieTitle} 
                  className="w-40 h-60 rounded object-cover"
                  loading="lazy"
                  onError={(e) => {
                    // Hide image if it fails to load
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              ) : (
                <div className="w-40 h-60 bg-gradient-to-br from-gray-300 to-gray-400 rounded flex items-center justify-center">
                  <div className="text-center p-4">
                    <div className="text-4xl mb-2">🎬</div>
                    <div className="text-xs text-gray-600 font-medium break-words">
                      {movieTitle}
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex-1 min-w-0"> {/* min-w-0 prevents flex overflow */}
              <div className="space-y-3">
                {movie.Released && movie.Released !== "N/A" && (
                  <p><span className="font-semibold">Released:</span> {movie.Released}</p>
                )}
                {movie.Genre && movie.Genre !== "N/A" && (
                  <p><span className="font-semibold">Genre:</span> {movie.Genre}</p>
                )}
                {movie.Director && movie.Director !== "N/A" && (
                  <p><span className="font-semibold">Director:</span> {movie.Director}</p>
                )}
                {movie.Actors && movie.Actors !== "N/A" && (
                  <p><span className="font-semibold">Actors:</span> {movie.Actors}</p>
                )}
                {movie.imdbRating && movie.imdbRating !== "N/A" && (
                  <p><span className="font-semibold">IMDB Rating:</span> {movie.imdbRating}</p>
                )}
                {movie.Runtime && movie.Runtime !== "N/A" && (
                  <p><span className="font-semibold">Runtime:</span> {movie.Runtime}</p>
                )}
                {movie.Plot && movie.Plot !== "N/A" && (
                  <div>
                    <p className="font-semibold mb-2">Plot:</p>
                    <p className="text-sm leading-relaxed break-words">{movie.Plot}</p>
                  </div>
                )}
                
                {/* Additional fields with safe checks */}
                {movie.Rated && movie.Rated !== "N/A" && (
                  <p><span className="font-semibold">Rated:</span> {movie.Rated}</p>
                )}
                {movie.Language && movie.Language !== "N/A" && (
                  <p><span className="font-semibold">Language:</span> {movie.Language}</p>
                )}
                {movie.Country && movie.Country !== "N/A" && (
                  <p><span className="font-semibold">Country:</span> {movie.Country}</p>
                )}
                {movie.Awards && movie.Awards !== "N/A" && (
                  <p><span className="font-semibold">Awards:</span> {movie.Awards}</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Footer with close button */}
        <div className="p-4 border-t border-gray-200">
          <button 
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500" 
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailsModal;
