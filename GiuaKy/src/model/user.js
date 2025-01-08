import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    age: {
        type: Number
    },
    birthday: {
        type: String
    }
}, {
    timestamps: true, versionKey: false
});

export default mongoose.model("User", userSchema);