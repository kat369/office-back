import mongoose from "mongoose";
const ThreeSchema = new mongoose.Schema(
  {
    volume: {
      type: Number,
    },
    issue: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);


const THREE= mongoose.model("three", ThreeSchema);


export default THREE

