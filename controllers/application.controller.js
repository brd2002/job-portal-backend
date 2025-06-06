import {User} from "../models/user.model.js";
import {Application} from "../models/application.model.js";
import {Job} from "../models/job.model.js";

export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const findUser = await User.findById(userId);
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({message : "Job not found", success : false});
        }
        if (!findUser){
            return res.status(400).json({message : "User not found", success : false});
        }
        const existingApplication = await Application.findOne({job : jobId , applicant : userId});
        if (existingApplication) {
            return res.status(400).json({message : "You have already applied for this job", success : false});
        }
        // check if the jobs exists
        const job = await Job.findById(jobId);
        if(!job) {
            return res.status(400).json({message : "Job not found", success : false});
        }
        // create a new application
        const application = await Application.create({job : jobId , applicant : userId});
        await job.applications.push(application._id);
        await job.save();
        return res.status(200).json({message : "Job applied successfully", success : true});
    }catch (e) {
        console.log(e.message);
    }
}
export const getAppliedJobs = async (req , res) =>{
    try{
        const userId = req.id;
        // console.log(userId);
        const applications = await Application.find({applicant : userId}).sort({createdAt:-1}).populate({
            path:'job',
            options:{sort:{createdAt : -1}},
            populate:{
                path:'company',
                options:{sort:{createdAt : -1}},
            }
        })
        if(!applications){
            return res.status(400).json({message : "No application" , success : false});
        }
        return res.status(200).json({message : "Here your applications" , success : true , data : applications})
    }catch (e) {
        console.log(e.message)
    }
}
// admin will see how many students applied for this jobs
export const getApplicants = async (req, res) =>{
    try{
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path:'applications',
            options:{sort:{createdAt:-1}},
            populate:{
                path:'applicant'
            }
        });
        if (!job){
            return res.status(400).json({message : "Job not found",  success : false})
        }
        return res.status(200).json({message : "Here your's job",  success : true , data : job})
    }catch (e) {
        console.log(e.message)
    }
}
export const updateStatus = async (req, res ) =>{
    try{
        const {status} = req.body;
        const applicationId = req.params.id;
        if(!status){
            return res.status(400).json({message : "status is required " , status : false})
        }
        const application  = await Application.findOne({_id : applicationId});
        if (!application){
            return res.status(400).json({message : "Application not found" , status : false})
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({message : "Status updated successfully" , status : true})
    }catch (e) {
        console.log(e.message)
    }
}