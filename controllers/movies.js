// controllers/movie.js
import { movies } from "../data/movies.js";
import { directors } from "../data/directors.js";

// Obtener todas las películas
export const getAllMovies = (req, res) => {
  let result = [...movies];
  const { genre, minRating, minYear, maxYear } = req.query;

  if (genre) result = result.filter(m => m.genre.includes(genre));
  if (minRating) result = result.filter(m => m.rating >= parseFloat(minRating));
  if (minYear) result = result.filter(m => m.releaseYear >= parseInt(minYear));
  if (maxYear) result = result.filter(m => m.releaseYear <= parseInt(maxYear));

  res.json(result);
};

// Obtener película por ID
export const getMovieById = (req, res, next) => {
  const movie = movies.find(m => m.id === req.params.id);
  if (!movie)
    return next({ status: 404, message: "Movie not found", code: 404 });
  res.json(movie);
};

// Crear nueva película
export const createMovie = (req, res, next) => {
  const newMovie = req.body;

  if (!newMovie.id || !newMovie.title || !newMovie.releaseYear || !newMovie.directorId)
    return next({ status: 400, message: "Missing required fields", code: 400 });

  if (movies.some(m => m.id === newMovie.id))
    return next({ status: 409, message: "Movie already exists", code: 409 });

  const directorExists = directors.some(d => d.id === newMovie.directorId);
  if (!directorExists)
    return next({ status: 422, message: "Director does not exist", code: 422 });

  movies.push(newMovie);
  res.status(201).json(newMovie);
};

// Actualizar película
export const updateMovie = (req, res, next) => {
  const index = movies.findIndex(m => m.id === req.params.id);
  if (index === -1)
    return next({ status: 404, message: "Movie not found", code: 404 });

  movies[index] = { ...movies[index], ...req.body };
  res.json(movies[index]);
};

// Eliminar película
export const deleteMovie = (req, res, next) => {
  const index = movies.findIndex(m => m.id === req.params.id);
  if (index === -1)
    return next({ status: 404, message: "Movie not found", code: 404 });

  movies.splice(index, 1);
  res.json({ message: "Movie deleted successfully" });
};
