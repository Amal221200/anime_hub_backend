import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import connectToDB from "./db/connectToDB.js";
import userRoutes from "./routes/userRoutes.js";
import animeRoutes from "./routes/animeRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

connectToDB();
const app = express();

app.use(cors(
    {
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
        origin: [process.env.ADMIN_ORIGIN, process.env.MAIN_ORIGIN],
        optionsSuccessStatus: 201
    }
))

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.get("/", async (_req, res) => {
    console.log(process.env.SECRET_KEY);
    return res.json('anime');
})

app.use("/api/user", userRoutes);
app.use("/api/anime", animeRoutes);
app.use("/api/review", reviewRoutes);

app.listen(3000, () => {
    console.log(`Server Listening at http://localhost:${3000}`);
})