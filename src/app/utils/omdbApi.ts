export async function fetchMovies({ s, type, y, page }: { s: string, type?: string, y?: string, page?: number }) {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  let url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${encodeURIComponent(s)}&page=${page ?? 1}`;
  if (type) url += `&type=${type}`;
  if (y) url += `&y=${y}`;
  const res = await fetch(url);
  return res.json();
}

export async function fetchMovieDetails(imdbID: string) {
  const apiKey = process.env.NEXT_PUBLIC_OMDB_API_KEY;
  const url = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=full`;
  const res = await fetch(url);
  return res.json();
}
