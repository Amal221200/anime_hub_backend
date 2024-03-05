import { Schema, model } from "mongoose";

const UserSchema = new Schema({
    username: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Username is required"],
    },
    password: {
        type: String,
        min: [8, "Password too short"],
        max: [12, "Password too long"],
        required: [true, "Password is required"],
    }
}, {
    timestamps: true
})

const User = model('User', UserSchema);

export default User;

