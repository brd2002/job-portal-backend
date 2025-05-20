import {Company} from "../models/company.model.js";
import {User} from "../models/user.model.js";

export const registerCompany = async (req, res) => {
    try{
        const userId = req.id;
        // console.log(userId)
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(400).json({message : "User not found", success : false});
        }
        const {companyName} = req.body;
        if (!companyName) {
            return res.status(400).json({message : "Company name is missing", success : false});
        }
        let company = await Company.findOne({name : companyName , userId : userId});
        if (company) {
            return res.status(400).json({message : "Company already exists with this name", success : false});
        }
        const newCompany = await Company.create({name : companyName , userId : userId});
        if(!newCompany) {
            return res.status(400).json({message : "Something went wrong", success : false});
        }
        return res.status(200).json({message : "Company registered successfully", success : true , data : newCompany});
    }catch (e) {
        console.log(e.message);
    }
}

export const getCompanies = async (req, res) => {
    try{
        const userId = req.id;
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(400).json({message : "User not found", success : false});
        }
        const companies = await Company.find({userId : req.id});
        // logged in
        if(!companies) {
            return res.status(400).json({message : "Something went wrong", success : false});
        }
        return res.status(200).json({message : "Companies fetched successfully", success : true , data : companies});
    }catch (e) {
        console.log(e.message);
    }
}
// get company by id
export const getCompanyById = async (req, res) => {
    try{
        const userId = req.id;
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(400).json({message : "User not found", success : false});
        }
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        // logged in
        if(!company) {
            return res.status(400).json({message : "Something went wrong", success : false});
        }
        return res.status(200).json({message : "Company fetched successfully", success : true , data : company});
    }
    catch (e) {
        console.log(e.message);
    }
}
export const updateCompany = async (req, res) => {
    try{
        const userId = req.id;
        const findUser = await User.findById(userId);
        if (!findUser) {
            return res.status(400).json({message : "User not found", success : false});
        }
        const {name , description , website , location} = req.body;
        const file = req.file;
        // cloudinary upload later
        const updateData = {name , description , website , location};
        const company = await Company.findByIdAndUpdate(req.params.id , updateData , {new : true});
        if(!company) {
            return res.status(400).json({message : "Something went wrong", success : false});
        }
        return res.status(200).json({message : "Company updated successfully", success : true , data : company});
    }
    catch (e) {
        console.log(e.message);
    }
}