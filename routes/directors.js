import express from "express";
import * as directorsController from "../controllers/directors.js";

const router = express.Router();

router.get("/", directorsController.getAllDirectors);
router.get("/:id/movies", directorsController.getMoviesByDirector);
router.post("/", directorsController.createDirector);

export default router;
