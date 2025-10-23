import express from "express";
import movieRoutes from "./routes/movies.js";
import directorsRoutes from "./routes/directors.js";
import actorsRoutes from "./routes/actors.js";
import movieActorsRoutes from "./routes/movieActors.js";

const app = express();
app.use(express.json());

// Endpoints
app.use("/api/movies", movieRoutes);
app.use("/api/directors", directorsRoutes);
app.use("/api/actors", actorsRoutes);
app.use("/api/movies", movieActorsRoutes); // movieActors usa movieId en la ruta

// Manejo de errores genérico
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

app.listen(3000, () => console.log("Servidor corriendo en http://localhost:3000"));

