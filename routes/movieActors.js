
import express from "express";
import * as movieActorsController from "../controllers/movieActors.js";

const router = express.Router();

router.get("/:movieId/actors", movieActorsController.getActorsByMovie);
router.post("/:movieId/actors", movieActorsController.addActorToMovie);

export default router;
