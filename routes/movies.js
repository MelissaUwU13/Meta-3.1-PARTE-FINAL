import express from "express";
import * as movieController from "../controllers/movies.js";

const router = express.Router();

router.get("/", movieController.getAllMovies);
router.get("/:id", movieController.getMovieById);
router.post("/", movieController.createMovie);
router.put("/:id", movieController.updateMovie);
router.delete("/:id", movieController.deleteMovie);

export default router;
