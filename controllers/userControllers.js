import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import createToken from "../utils/createToken.js";


export const signIn = async (req, res) => {
    try {
        const body = req.body;

        if (!body.username || !body.password) {
            return res.status(400).json("Please enter all the fields");
        }

        const user = await User.findOne({ username: body.username });

        if (!user) {
            return res.status(404).json("User does not exist");
        }

        const passwordValidated = await bcrypt.compare(body.password, user.password);

        if (!passwordValidated) {
            return res.status(400).json("Incorrect Password");
        }

        createToken(res, user._id);
        return res.json({ user });
    } catch (error) {
        console.log('signIn', error);
        return res.status(500).json("Internal Server Error");
    }
}

export const signOut = async (req, res) => {
    try {
        if (!req.cookies.jwt) {
            return res.status(400).json("Invalid user creadentials")
        }

        res.cookie('jwt', '', {
            httpOnly: true,
            expiresIn: new Date(0)
        });

        return res.json("Logged out successfully.")
    } catch (error) {
        console.log('signIn', error);
        return res.status(500).json("Internal Server Error");
    }
}

export const getSession = async (req, res) => {
    try {

        return res.json({ user: req.user, token });
    } catch (error) {
        console.log('getSession', error);
        return res.status(500).json("Internal Server Error");
    }
}

export const signUp = async (req, res) => {

    try {
        const body = req.body;

        if (!body.username || !body.password || !body.email) {
            return res.status(400).json("Please enter all the fields");
        }

        const checkUser = await User.findOne({ $or: [{ username: body.username }, { email: body.email }] });

        if (checkUser) {
            return res.status(400).json("Username or email already used");
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(body.password, salt)

        const newUser = new User({ username: body.username, email: body.email, password: hashedPassword });

        await newUser.save();
        createToken(res, newUser._id);
        return res.status(201).json({ user: { _id: newUser._id, username: newUser.username, email: newUser.email, } });
    } catch (error) {
        console.log('signup', error);
        return res.status(500).json("Internal Server Error")
    }
}