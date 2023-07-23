import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/userRoutes";

// Environment variables
if (process.env.NODE_ENV === 'production') {
    dotenv.config({ path: '.env.production' });
  } else {
    dotenv.config({ path: '.env.development' });
  }

// Connect to MongoDB
const establishMongoConnection = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            throw new Error("MONGODB_URI must be defined");
        }
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB: ", error);
        process.exit(1);
    }
}

establishMongoConnection();

const app = express();
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 3000;

// Routes
app.use("/accounts", userRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
