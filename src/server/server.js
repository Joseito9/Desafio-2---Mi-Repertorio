import express from "express";
import cors from "cors";
import router from "../routes/cancionesRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 3000;

app.use(cors());
app.use(express.json());
app.use("/", router);

app.listen(PORT, () =>
  console.log(` 
 🎵 Server UP🎵 on http://localhost:${PORT}`)
);

export default app;
