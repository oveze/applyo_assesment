// types.ts - Movie type definitions
export interface MovieSearchResult {
  imdbID: string;
  Title: string;
  Year: string;
  Type: 'movie' | 'series' | 'episode';
  Poster: string;
}

export interface MovieDetails extends MovieSearchResult {
  Rated?: string;
  Released?: string;
  Runtime?: string;
  Genre?: string;
  Director?: string;
  Writer?: string;
  Actors?: string;
  Plot?: string;
  Language?: string;
  Country?: string;
  Awards?: string;
  Metascore?: string;
  imdbRating?: string;
  imdbVotes?: string;
  DVD?: string;
  BoxOffice?: string;
  Production?: string;
  Website?: string;
  Response?: string;
}

export interface ApiSearchResponse {
  Search: MovieSearchResult[];
  totalResults: string;
  Response: string;
  Error?: string;
}

export interface SearchQuery {
  s: string;
  type?: string;
  y?: string;
  page?: number;
}