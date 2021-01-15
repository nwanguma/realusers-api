import mongoose from "mongoose";

mongoose.connect(
  process.env.MONGODB_URI || "mongodb://localhost:27017/realusers",
  {
    useNewUrlParser: true,
  }
);

export default mongoose;
