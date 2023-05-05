import axios, { Method } from 'axios';

import { MoviesResponseModel } from '@/types/moviesResponseModel';

export const fetchMovies = async (): Promise<MoviesResponseModel> => {
  const res = await axios({
    method: 'get' as Method,
    url: `api/movie/now_playing?api_key=${process.env.NEXT_PUBLIC_THEMOVIEDB_APIKEY}`,
  });
  return res.data;
};
