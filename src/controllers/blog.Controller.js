import blogModel from "../models/blog.Model.js";
import userModel from "../models/user.Model.js";


export async function createBlog(req, res) {
    try {
        const { userId } = req.user;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).send({
                success: false,
                message: "Please Provide All Fields",
            });
        }

        const existingUser = await userModel.findById(userId);
        if (!existingUser) {
            return res.status(404).send({
                success: false,
                message: "Unable to find user",
            });
        }

        const newBlog = new blogModel({
            title,
            description,
            publishedBy: userId
        });

        await newBlog.save();
        existingUser.blogs.push(newBlog);
        await existingUser.save();

        return res.status(201).send({
            success: true,
            message: "Blog Created!",
            newBlog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}

export async function updateBlog(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const { title, description } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const blog = await blogModel.findById(id);
        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        // Check if the authenticated user is the owner of the blog
        if (blog.publishedBy.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized: You cannot edit this blog" });
        }

        const updatedBlog = await blogModel.findByIdAndUpdate(
            id,
            { title, description },
            { new: true, runValidators: true }
        );

        return res.status(200).json({
            success: true,
            message: "Blog updated successfully",
            blog: updatedBlog
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}

export async function getAllBlogs(req, res) {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const blogs = await blogModel.find()
            .populate("publishedBy")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await blogModel.countDocuments();

        if (!blogs.length) {
            return res.status(200).json({
                success: false,
                message: "No Blogs Found",
            });
        }

        return res.status(200).send({
            success: true,
            BlogCount: blogs.length,
            totalBlogs,
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit),
            message: "All Blogs list",
            blogs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}

export async function getUserBlog(req, res) {
    try {
        const { userId } = req.params;
        const page = parseInt(req.query.page) || 1;
        const limit = 10;
        const skip = (page - 1) * limit;

        const blogs = await blogModel.find({ publishedBy: userId })
            .populate("publishedBy")
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);

        const totalBlogs = await blogModel.countDocuments({ publishedBy: userId });

        if (!blogs.length) {
            return res.status(404).json({ success: false, message: "No blogs found for this user" });
        }

        return res.status(200).json({
            success: true,
            BlogCount: blogs.length,
            totalBlogs,
            currentPage: page,
            totalPages: Math.ceil(totalBlogs / limit),
            message: "User's blogs retrieved successfully",
            blogs,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}

export async function getBlogById(req, res) {
    try {
        const { id } = req.params;
        const blog = await blogModel.findById(id).populate("publishedBy");

        if (!blog) {
            return res.status(404).send({
                success: false,
                message: "Blog not found",
            });
        }

        return res.status(200).send({
            success: true,
            message: "Blog retrieved successfully",
            blog,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}

export async function deleteBlog(req, res) {
    try {
        const { id } = req.params;
        const { userId } = req.user; 

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ success: false, message: "Blog not found" });
        }

        if (blog.publishedBy.toString() !== userId) {
            return res.status(403).json({ success: false, message: "Unauthorized: You cannot delete this blog" });
        }

        await blogModel.findByIdAndDelete(id);
        await userModel.findByIdAndUpdate(userId, { $pull: { blogs: id } });

        return res.status(200).json({ success: true, message: "Blog deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal Server Error: " + error.message });
    }
}