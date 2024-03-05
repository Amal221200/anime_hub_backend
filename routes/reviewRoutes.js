import { Router } from "express";
import { addReview, deleteReview, getReviews } from "../controllers/reviewControllers.js";
import { handleUser } from "../middleware/authMiddlewares.js";

const reviewRoutes = Router();

reviewRoutes.get("/", getReviews);
reviewRoutes.post("/", handleUser, addReview);
reviewRoutes.delete("/:id", handleUser, deleteReview);

export default reviewRoutes;