import mongoose from "mongoose";

const connectDb = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error("DB Connection Failed", error);
        process.exit(1); // Optional: exit process if DB fails to connect
    }
};

export default connectDb;
