import { movieActors } from "../datos/movieActors.js";
import { movies } from "../datos/movies.js";
import { actors } from "../datos/actors.js";

// Obtener actores de una película
export const getActorsByMovie = (req, res, next) => {
  const movie = movies.find(m => m.id === req.params.movieId);
  if (!movie)
    return next({ status: 404, message: "Movie not found", code: 404 });

  const relations = movieActors.filter(ma => ma.movieId === req.params.movieId);
  const result = relations.map(r => {
    const actor = actors.find(a => a.id === r.actorId);
    return { ...actor, characterName: r.characterName };
  });

  res.json(result);
};

// Agregar actor a una película
export const addActorToMovie = (req, res, next) => {
  const movie = movies.find(m => m.id === req.params.movieId);
  if (!movie)
    return next({ status: 404, message: "Movie not found", code: 404 });

  const { actorId, characterName } = req.body;
  if (!actorId || !characterName)
    return next({ status: 400, message: "Missing actorId or characterName", code: 400 });

  const actor = actors.find(a => a.id === actorId);
  if (!actor)
    return next({ status: 422, message: "Actor does not exist", code: 422 });

  const exists = movieActors.some(ma => ma.movieId === req.params.movieId && ma.actorId === actorId);
  if (exists)
    return next({ status: 409, message: "Actor already in movie", code: 409 });

  const newRelation = { movieId: req.params.movieId, actorId, characterName };
  movieActors.push(newRelation);
  res.status(201).json(newRelation);
};
