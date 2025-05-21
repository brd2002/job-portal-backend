import express from "express";
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import {connectDB} from "./utils/db.js";
import {userRouter} from './routes/user.route.js'
import {companyRouter} from "./routes/company.route.js";
import {jobRouter} from "./routes/job.route.js";
import {applicationRouter} from "./routes/application.route.js";
dotenv.config();
const app = express();
// middleware
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(cookieParser());
const corsOptions = {
    origin : 'http://localhost:5173',
    credentials : true
}
app.use(cors());
app.use(
    '/api/v1/user' , userRouter
)
app.use(
    '/api/v1/company' , companyRouter
);
app.use(
    '/api/v1/job' , jobRouter
)
app.use(
    '/api/v1/application' , applicationRouter
)

const port = process.env.PORT || 8080;
app.listen(port , ()=>{
    connectDB();
    console.log(`Server is running on port ${port}`)
})