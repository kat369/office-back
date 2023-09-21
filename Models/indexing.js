import mongoose from "mongoose";
const IndexSchema = new mongoose.Schema(
  {
    imageurl: {
      type: String,
    },
    tags: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("index", IndexSchema);
