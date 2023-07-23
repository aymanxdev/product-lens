import mongoose from "mongoose";

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
};

export default establishMongoConnection;
