import axios from 'axios';

export const fetchData = async (inputValue) => {
  let response;
  let movies;

  response = await axios('/data/movies.json');
  movies = await response.data.movies;

  if (inputValue) {
    console.log('Filtering movies by ' + inputValue);
    movies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(inputValue.toLowerCase())
    );
  }

  return movies;
};
