import mongoose from "mongoose";
import jwt from "jsonwebtoken";

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is required"],
    },
    email: {
        type: String,
        required: [true, "email is required"],
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
    blogs: [
        {
            type: mongoose.Types.ObjectId,
            ref: "Blog",
        },
    ],
}, { timestamps: true });

UserSchema.methods.generateAuthToken = function () {
    return jwt.sign(
        { userId: this._id }, 
        process.env.JWT_SECRET, 
        { expiresIn: "7d" }
    );
};

export default mongoose.model.Users || mongoose.model('User', UserSchema);