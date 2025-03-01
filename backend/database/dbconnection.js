import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            dbName: "Wiggle",
        });
        console.log("connected to MongoDB");
    }
    catch {
        console.log(error);
    }
}