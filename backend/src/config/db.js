import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);

    try {
      await mongoose.connection.db.collection("users").dropIndex("mobileNumber_1");
      console.log("Removed stale users.mobileNumber_1 index");
    } catch (indexError) {
      if (indexError.codeName !== "IndexNotFound") {
        console.log("Index cleanup skipped:", indexError.message);
      }
    }

    console.log("MongoDB connected at", conn.connection.host);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;