import express from "express";
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
import {applyJob , getAppliedJobs , updateStatus , getApplicants} from '../controllers/application.controller.js'
const router = express.Router();
router.get('/apply/:id', isAuthenticated , applyJob);
router.get('/get-applied-jobs', isAuthenticated , getAppliedJobs);
router.post('/update-status/:id', isAuthenticated , updateStatus);
// this is for admin
router.get('/get-applicants/:id', isAuthenticated , getApplicants);
export {router as applicationRouter};