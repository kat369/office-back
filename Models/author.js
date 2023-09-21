import mongoose from "mongoose";
const AuthorSchema = new mongoose.Schema(
  {
    cheif: [
      {
        name: {
          type: String,
        },
        dep: {
          type: String,
        },
        place: {
          type: String,
        },
      },
    ],
    assosiate: [
      {
        name: {
          type: String,
        },
        dep: {
          type: String,
        },
        place: {
          type: String,
        },
      },
    ],

    members: [
      {
        name: {
          type: String,
        },
        dep: {
          type: String,
        },
        place: {
          type: String,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("author", AuthorSchema);
