 // controllers/directors.js
import { directors } from "../data/directors.js";
import { movies } from "../data/movies.js";

// Obtener todos los directores
export const getAllDirectors = (req, res) => {
  let result = [...directors];
  const { nationality, minBirthYear } = req.query;
  if (nationality) result = result.filter(d => d.nationality.toLowerCase() === nationality.toLowerCase());
  if (minBirthYear) result = result.filter(d => d.birthYear >= parseInt(minBirthYear));
  res.json(result);
};

// Obtener películas de un director
export const getMoviesByDirector = (req, res, next) => {
  const director = directors.find(d => d.id === req.params.id);
  if (!director)
    return next({ status: 404, message: "Director not found", code: 404 });

  const result = movies.filter(m => m.directorId === req.params.id);
  res.json(result);
};

// Crear director
export const createDirector = (req, res, next) => {
  const newDirector = req.body;
  if (!newDirector.id || !newDirector.name || !newDirector.birthYear)
    return next({ status: 400, message: "Missing required fields", code: 400 });

  if (directors.some(d => d.id === newDirector.id))
    return next({ status: 409, message: "Director already exists", code: 409 });

  directors.push(newDirector);
  res.status(201).json(newDirector);
};

