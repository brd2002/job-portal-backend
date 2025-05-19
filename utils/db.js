import mongoose from "mongoose";

export const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        console.log("Mongodb connected");
    }catch (e) {
        console.log("Db connection error");
        console.log(e.message);
    }
}