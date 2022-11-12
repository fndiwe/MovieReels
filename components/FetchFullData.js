import axios from 'axios';
const URL = 'https://api.themoviedb.org/3/';
const API_KEY = '8d5fbc35563d3cb422cae3e81f8ef001';
export const fetchData = async props => {
  const response = await axios.get(
    `${URL}${props.type}/${props.category}?api_key=${API_KEY}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const genreFetch = async props => {
  const response = await axios.get(
    `${URL}discover/${props.type}?api_key=${API_KEY}&with_genres=${props.genre_id}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const fetchTrendingData = async props => {
  const response = await axios.get(
    `${URL}${props.category}/${props.type}/week?api_key=${API_KEY}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const kidsFetch = async props => {
  const response = await axios.get(
    `${URL}discover/${props.type}?api_key=${API_KEY}&with_genres=16&language=en-US&certification.lte=G&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const fetchTvData = async props => {
  const response = await axios.get(
    `${URL}tv/${props.category}?api_key=${API_KEY}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const fetchNewMovies = async props => {
  const response = await axios.get(
    `${URL}discover/${props.type}?api_key=${API_KEY}&year=${new Date()
      .getFullYear()
      .toString()}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const search = async props => {
  const response = await axios.get(
    `${URL}search/${props.type}?api_key=${API_KEY}&query=${props.query}&sort_by=release_date.descpage=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const personalitySearch = async props => {
  const response = await axios.get(
    `${URL}person/${props.id}?api_key=${API_KEY}&append_to_response=movie_credits`,
  );
  if (response.status == 200) {
    return response.data;
  }
  return null;
};
export const companiesFetch = async props => {
  const response = await axios.get(
    `${URL}discover/${props.type}?api_key=${API_KEY}&with_companies=${props.id}&page=${props.page}`,
  );
  if (response.status == 200) {
    return response.data.results;
  }
  return null;
};
export const previewFetch = async props => {
  const response = await axios.get(
    `${URL}/${props.type}/${props.id}?api_key=${API_KEY}&append_to_response=recommendations,credits,videos`,
  );
  if (response.status == 200) {
    return response.data;
  }
  return null;
};
export const episodesFetch = async props => {
  const response = await axios.get(
    `${URL}/tv/${props.id}/season/${props.season}?api_key=${API_KEY}`,
  );
  if (response.status == 200) {
    return response.data.episodes;
  }
  return null;
};
