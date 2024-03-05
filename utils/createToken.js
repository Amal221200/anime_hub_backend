import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

export default function createToken(res, userId) {
    const token = jwt.sign({ userId }, process.env.SECRET_KEY, {
        expiresIn: '30d'
    });

    res.cookie('jwt', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        sameSite: 'none',
        maxAge: 30 * 24 * 60 * 60 * 1000
    });

    return token;
}   