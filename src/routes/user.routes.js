import { Router } from 'express'
const router = Router()

import * as UsersController from '../controllers/user.controller.js'
import UserAuth from '../middleware/user.Auth.js';

// POST ROUTES
router.route('/registerUser').post(UsersController.registerUser);
router.route('/loginUser').post(UsersController.loginUser);

// GET ROUTES

// PUT ROUTES

// DELETE ROUTES

export default router;