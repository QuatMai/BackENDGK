import mongoose from "mongoose";

export const connectDB = async (url) => {
    try {
        console.log("uri:" + url);
        await mongoose.connect(url);
    } catch (err) {
        console.log("Không kết nối được db");
        console.log(err);
    }
}