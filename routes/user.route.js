import express from "express";
import {registerUser , login , updateProfile , logout} from '../controllers/user.controller.js';
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.post('/register' , registerUser);
router.post('/login' , login);
router.post('/profile/update',isAuthenticated , updateProfile);
router.post('/logout' ,isAuthenticated , logout);
export {router as userRouter};