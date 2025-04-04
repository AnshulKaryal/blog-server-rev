import mongoose from "mongoose";

export const BlogSchema = new mongoose.Schema({
    title: {
        type: String,
        require: [true, "title is required"],
    },
    description: {
        type: String,
        required: [true, "description is require"],
    },
    publishedBy: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        require: [true, "user id is required"],
    },
}, { timestamps: true });

export default mongoose.model.Blogs || mongoose.model('Blog', BlogSchema);