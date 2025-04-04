import { Router } from 'express'
const router = Router()

import * as BlogController from '../controllers/blog.Controller.js'
import UserAuth from '../middleware/user.Auth.js';

// POST ROUTES
router.route('/createBlog').post(UserAuth, BlogController.createBlog);

// GET ROUTES
router.route('/getAllBlogs').get(BlogController.getAllBlogs);
router.route('/getUserBlog').get(BlogController.getUserBlog);
router.route('/getBlogById').get(BlogController.getBlogById);

// PUT ROUTES
router.route('/updateBlog').put(UserAuth, BlogController.updateBlog);

// DELETE ROUTES
router.route('/deleteBlog').delete(UserAuth, BlogController.deleteBlog);

export default router;