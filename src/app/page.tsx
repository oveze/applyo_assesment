"use client";

import { useState, useEffect, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import MovieCard from "./components/MovieCard";
import Pagination from "./components/Pagination";
import MovieDetailsModal from './components/MovieDetailsModal';
import { MovieSearchResult, MovieDetails, ApiSearchResponse, SearchQuery } from './types';

const API_KEY = process.env.NEXT_PUBLIC_OMDB_API_KEY;

// Debug logging
console.log("Environment variables check:");
console.log("NEXT_PUBLIC_OMDB_API_KEY:", process.env.NEXT_PUBLIC_OMDB_API_KEY);
console.log("API_KEY variable:", API_KEY);
console.log("All NEXT_PUBLIC env vars:", Object.keys(process.env).filter(key => key.startsWith('NEXT_PUBLIC')));

const fetchMovies = async (query: SearchQuery): Promise<ApiSearchResponse> => {
  if (!API_KEY) {
    throw new Error("OMDB API key is not configured. Please check your environment variables.");
  }
  
  const {s, type, y, page} = query;
  let url = `https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(s)}&page=${page ?? 1}`;
  if (type) url += `&type=${type}`;
  if (y) url += `&y=${y}`;
  
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

const fetchMovieDetails = async (imdbID: string): Promise<MovieDetails> => {
  if (!API_KEY) {
    throw new Error("OMDB API key is not configured. Please check your environment variables.");
  }
  
  const url = `https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=full`;
  const res = await fetch(url);
  
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  
  return res.json();
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("");
  const [year, setYear] = useState("");
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState<MovieSearchResult[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selected, setSelected] = useState<string | null>(null);
  const [modalData, setModalData] = useState<MovieDetails | null>(null);

  // Check if API key is available on component mount
  useEffect(() => {
    if (!API_KEY) {
      setError("OMDB API key is not configured. Please add NEXT_PUBLIC_OMDB_API_KEY to your .env.local file.");
    }
  }, []);

  const searchMovies = useCallback(async () => {
    if (!search.trim()) return;
    if (!API_KEY) {
      setError("OMDB API key is not configured. Please check your environment variables.");
      return;
    }
    
    setError(""); 
    setLoading(true);
    
    try {
      const data = await fetchMovies({s: search, type, y: year, page});
      if (data.Response === "False") {
        setMovies([]);
        setTotalPages(1);
        setError(data.Error || "No results found.");
      } else {
        setMovies(data.Search);
        setTotalPages(Math.ceil(+data.totalResults / 10));
      }
    } catch (err) {
      console.error("Search error:", err);
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Network error. Please try again.");
      }
    }
    setLoading(false);
  }, [search, type, year, page]);

  useEffect(() => { 
    if (search.trim() && API_KEY) {
      searchMovies(); 
    }
  }, [searchMovies]);

  const handleSearch = () => { 
    setPage(1); 
    searchMovies(); 
  };
  
  const handlePage = (p: number) => setPage(p);

  const openDetails = async (movie: MovieSearchResult) => {
    if (!API_KEY) {
      setError("OMDB API key is not configured. Cannot fetch movie details.");
      return;
    }
    
    setSelected(movie.imdbID);
    setModalData(null); // show loader
    
    try {
      const details = await fetchMovieDetails(movie.imdbID);
      setModalData(details);
    } catch (err) {
      console.error("Details fetch error:", err);
      setError("Failed to fetch movie details. Please try again.");
      setSelected(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="max-w-3xl mx-auto p-4 flex-grow">
        <h1 className="text-3xl font-bold mb-3">Movie & Series Explorer</h1>
        <SearchBar value={search} onChange={setSearch} onSearch={handleSearch} />
        <Filters type={type} year={year} setType={setType} setYear={setYear} />
        {loading && <div className="text-center py-8">Loading...</div>}
        {error && <div className="text-red-600 py-4 bg-red-50 border border-red-200 rounded p-3">{error}</div>}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {movies.map(movie => (
            <MovieCard key={movie.imdbID} movie={movie} onClick={() => openDetails(movie)} />
          ))}
        </div>
        {totalPages > 1 && (
          <Pagination current={page} total={totalPages} onPage={handlePage} />
        )}
        {selected && modalData && (
          <MovieDetailsModal movie={modalData} onClose={() => setSelected(null)} />
        )}
        {selected && !modalData && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white p-6 rounded">
              <div className="text-center">Loading movie details...</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}