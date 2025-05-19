import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const registerUser =async (req, res) => {
    try{
        const {fullname , email , phoneNumber , password , role} = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({message : "Something is missing", success : false});
        }
        const user = await User.findOne({email});
        if (user) {
            return res.status(400).json({message : "User already exists with this email", success : false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,
            phoneNumber,
            password : hashedPassword,
            role,
        })
        return res.status(200).json({message : "User created successfully", success : true});
    }catch (e) {
        console.log(e.message);
    }
}
export const login = async (req, res) => {
    try{
        const {email , password , role} = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({message : "Something is missing", success : false});
        }
        let user = await User.findOne({email});
        if (!user) {
            return res.status(400).json({message : "User not found", success : false});
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message : "Invalid credentials", success : false});
        }
        // check role
        if (user.role !== role) {
            return res.status(400).json({message: "Invalid role", success: false});
        }
        const tokenData = {userId : user._id};
        const token = await jwt.sign(tokenData, process.env.JWT_SECRET , {expiresIn: '1d'});
        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
        return res.status(200).cookie('token', token , {maxAge: 24 * 60 * 60 * 1000 , httpOnly : true , sameSite : 'strict'}).json({message : `Welcome back ${user.fullname}`, success : true ,
        data : user});
    }catch (e) {
     console.log(e.message);
    }
}
export const logout = async (req, res) => {
    try{
        const userId = req.id;
        const user = await User.findById(userId);
        if(!user){
            return res.status(400).json({message : "User not found", success : false});
        }
        res.clearCookie('token');
        return res.status(200).json({message : "Logout successfully", success : true});
    }catch (e) {
        console.log(e.message);
    }
}
export const updateProfile = async (req, res) => {
    try {
        const {fullname ,email ,phoneNumber , bio , skills} = req.body;
        console.log(req.body);
        // const file = req.file;

        // cloudinary upload later

        const userId = req.id; // middleware authentication
        console.log(userId);
        let user = await User.findById(userId);
        // console.log(user);
        if (!user) {
            return res.status(400).json({message : "User not found", success : false});
        }
        // updating data
        if(fullname){
        user.fullname = fullname;
        }
        if (email) {
        user.email = email;
        }
        if(phoneNumber){
        user.phoneNumber = phoneNumber;
        }
        if(bio){
        user.profile.bio = bio;
        }
        if(skills){
        const skillsArray = skills.split(',');
        user.profile.skills = skillsArray;
        }
        await user.save();
        // the resume comes later here...
        user = {
            _id : user._id,
            fullname : user.fullname,
            email : user.email,
            phoneNumber : user.phoneNumber,
            role: user.role,
            profile: user.profile
        }
    return res.status(200).json({message : "Profile updated successfully", success : true , data:user});
    } catch (e) {
        console.log(e.message);
    }
}