import { Router } from "express";
import { addAnime, deleteAnime, editAnime, getAnime, getAnimes } from "../controllers/animeControllers.js";
import {handleUser, handleAdmin} from "../middleware/authMiddlewares.js";

const animeRoutes = Router();

animeRoutes.route("/").get(getAnimes).post(addAnime);
animeRoutes.route("/:id").get(getAnime).put(handleUser, handleAdmin, editAnime).delete(handleUser, handleAdmin, deleteAnime);

export default animeRoutes;