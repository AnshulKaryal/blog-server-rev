import cron from "node-cron";
import blogModel from "../models/blog.Model.js";
import userModel from "../models/user.Model.js";

cron.schedule("0 0 * * *", async () => {
    try {
        console.log("Running cron job: Deleting blogs older than 1 year...");

        const oneYearAgo = new Date();
        oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        const oldBlogs = await blogModel.find({ createdAt: { $lt: oneYearAgo } });

        if (oldBlogs.length === 0) {
            console.log("No blogs older than 1 year found.");
            return;
        }

        const blogIds = oldBlogs.map(blog => blog._id);

        await Blog.deleteMany({ _id: { $in: blogIds } });

        await userModel.updateMany(
            { blogs: { $in: blogIds } }, 
            { $pull: { blogs: { $in: blogIds } } }
        );

        console.log(`Deleted ${oldBlogs.length} old blogs successfully.`);
    } catch (error) {
        console.error("Error in cron job:", error);
    }
});