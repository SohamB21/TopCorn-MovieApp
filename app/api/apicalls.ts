const apikey: string = "b31e702ea287ba6d4039e66c4340ae28";
export const baseImagePath = (size: string, path: string) => {
	return `https://image.tmdb.org/t/p/${size}${path}`;
};
export const nowPlayingMovies: string = `https://api.themoviedb.org/3/movie/now_playing?api_key=${apikey}`;
export const popularMovies: string = `https://api.themoviedb.org/3/movie/popular?api_key=${apikey}`;
//export const topRatedMovies: string = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apikey}`;
export const upcomingMovies: string = `https://api.themoviedb.org/3/movie/upcoming?api_key=${apikey}`;
export const searchMovies = (keyword: string) => {
	return `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&query=${keyword}`;
};
export const movieDetails = (id: number) => {
	return `https://api.themoviedb.org/3/movie/${id}?api_key=${apikey}`;
};
export const movieCastDetails = (id: number) => {
	return `https://api.themoviedb.org/3/movie/${id}/credits/?api_key=${apikey}`;
};