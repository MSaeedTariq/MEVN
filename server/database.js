import mongoose from "mongoose";
import "dotenv/config";
const connection = async () => {
    await mongoose.connect(process.env.DB_URL);
    console.log("Database Connected Successfully");
}

export default connection;