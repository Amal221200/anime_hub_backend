import { Router } from "express";
import { getSession, signIn, signOut, signUp } from "../controllers/userControllers.js";
import { handleUser } from "../middleware/authMiddlewares.js";
import dotenv from "dotenv";

dotenv.config();

const userRoutes = Router();

userRoutes.get("/auth", handleUser, getSession);
userRoutes.post("/auth", signIn);
userRoutes.post("/sign-up", signUp);
userRoutes.get("/sign-out", signOut);

export default userRoutes;