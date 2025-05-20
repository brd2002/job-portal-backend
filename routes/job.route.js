import express from "express";
import {getAllJobs , postJob , getAdminJobs , getJobById} from '../controllers/job.controller.js';
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.post('/post-job',isAuthenticated , postJob);
// using keywords
router.get('/get-jobs', isAuthenticated , getAllJobs);
// this is for admin
router.get('/admin/get/jobs',isAuthenticated , getAdminJobs);
// this is for student
router.get('/student/get/jobs/:id' ,isAuthenticated , getJobById);
export {router as jobRouter};