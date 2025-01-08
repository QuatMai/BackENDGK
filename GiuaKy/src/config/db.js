import mongoose from "mongoose";

export const connectDB = async (url) =>{
    try{
        await mongoose.connect(url);
    }catch (err){
        console.log(err);
    }
}