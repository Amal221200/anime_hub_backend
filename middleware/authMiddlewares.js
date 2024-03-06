import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import User from "../models/userModel.js";


dotenv.config()

export const handleUser = async (req, res, next) => {
    try {
        const token = req.headers.cookie;

        if (!token) {
            return res.status(401).json("Unauthorized user");
        }

        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        const user = await User.findById(decoded.userId);
        req.user = user;
        next();
    } catch (err) {
        console.log('handle user', err);
        return res.status(500).json("Internal Server Error");
    }
}

export const handleAdmin = async (req, res, next) => {
    try {

        const user = req.user;

        if (user.role !== 'admin') {
            return res.status(401).json("Unauthorized admin")
        }

        next();
    } catch (err) {
        console.log('handle admin', err);
        return res.status(500).json("Internal Server Error")
    }
}