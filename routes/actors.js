import express from "express";
import * as actorsController from "../controllers/actors.js";

const router = express.Router();

router.get("/", actorsController.getAllActors);
router.get("/:id/movies", actorsController.getMoviesByActor);
router.post("/", actorsController.createActor);

export default router;
