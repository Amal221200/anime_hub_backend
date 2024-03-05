import { Router } from "express";
import { getSession, signIn, signOut, signUp } from "../controllers/userControllers.js";
import { handleUser } from "../middleware/authMiddlewares.js";
// import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const userRoutes = Router();

// userRoutes.use(cors(
//     {
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         credentials: true,
//         origin: [process.env.ADMIN_ORIGIN, process.env.MAIN_ORIGIN],
//         optionsSuccessStatus: 201,
//     }
// ));

userRoutes.get("/auth", handleUser, getSession);
userRoutes.post("/auth", signIn);
userRoutes.post("/sign-up", signUp);
userRoutes.get("/sign-out", signOut);

export default userRoutes;