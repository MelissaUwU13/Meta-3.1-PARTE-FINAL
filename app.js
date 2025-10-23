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

const PORT = 3000;

// Manejo de errores genérico
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

// Ruta base
app.get("/", (req, res) => {
  res.json({ message: "CineBase API - alive 🎬" });
});


//iniciar el servidor
const server = app.listen(PORT,() =>{
    console.log(`Servidor ejecutandose en http://localhost:${PORT}`)
})

server.on('error',error => console.log(`Error en el servidor: ${error}`));
