import express from "express";
import {getCompanyById , updateCompany , registerCompany , getCompanies} from '../controllers/company.controller.js'
import {isAuthenticated} from "../middlewares/isAuthenticated.js";
const router = express.Router();
router.post('/register', isAuthenticated , registerCompany);
router.get('/get-companies', isAuthenticated , getCompanies);
router.get('/get-company/:id', isAuthenticated , getCompanyById);
router.put('/update/:id',isAuthenticated , updateCompany);

export {router as companyRouter};