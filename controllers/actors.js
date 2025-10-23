import { actors } from "../datos/actors.js";
import { movieActors } from "../datos/movieActors.js";
import { movies } from "../datos/movies.js";

// Obtener todos los actores
export const getAllActors = (req, res) => {
  let result = [...actors];
  const { nationality, minBirthYear } = req.query;
  if (nationality) result = result.filter(a => a.nationality.toLowerCase() === nationality.toLowerCase());
  if (minBirthYear) result = result.filter(a => a.birthYear >= parseInt(minBirthYear));
  res.json(result);
};

// Obtener películas de un actor
export const getMoviesByActor = (req, res, next) => {
  const actor = actors.find(a => a.id === req.params.id);
  if (!actor)
    return next({ status: 404, message: "Actor not found", code: 404 });

  const relations = movieActors.filter(ma => ma.actorId === req.params.id);
  const result = relations.map(r => {
    const movie = movies.find(m => m.id === r.movieId);
    return { ...movie, characterName: r.characterName };
  });

  res.json(result);
};

// Crear actor
export const createActor = (req, res, next) => {
  const newActor = req.body;
  if (!newActor.id || !newActor.name || !newActor.birthYear)
    return next({ status: 400, message: "Missing required fields", code: 400 });

  if (actors.some(a => a.id === newActor.id))
    return next({ status: 409, message: "Actor already exists", code: 409 });

  actors.push(newActor);
  res.status(201).json(newActor);
};
