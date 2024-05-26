import { Router } from "express";
import {
  getIndexHtml,
  getSongs,
  addSong,
  updateSong,
  deleteSong,
  handleSong,
} from "../controllers/cancionesController.js";

const router = Router();

router.get("/", getIndexHtml);
router.get("/canciones", getSongs);
router.post("/canciones", addSong);
router.put("/canciones/:id", updateSong);
router.delete("/canciones/:id", deleteSong);
router.all("*", handleSong);

export default router;
