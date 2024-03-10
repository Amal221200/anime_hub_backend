import { Router } from "express";
import { deleteUser, getAllUser, getSession, signIn, signOut, signUp, updateUser } from "../controllers/userControllers.js";
import { handleAdmin, handleUser } from "../middleware/authMiddlewares.js";
import dotenv from "dotenv";

dotenv.config();

const userRoutes = Router();

userRoutes.get("/auth", handleUser, getSession);
userRoutes.post("/auth", signIn);
userRoutes.post("/sign-up", signUp);
userRoutes.get("/sign-out", signOut);

userRoutes.get("/", handleUser, handleAdmin, getAllUser)
userRoutes.put("/:id", handleUser, handleAdmin, updateUser);
userRoutes.delete("/:id", handleUser, handleAdmin, deleteUser);

export default userRoutes;