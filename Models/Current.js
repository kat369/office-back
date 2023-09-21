import mongoose from "mongoose";
const UserSchema = new mongoose.Schema(
  {
    year: {
      type: Number,
    },

    volume: {
      type: Number,
    },
    pstart: {
      type: Number,
    },

    pend: {
      type: Number,
    },

    from: {
      type: String,
    },

    to: {
      type: String,
    },

    status: {
      type: String,
    },

    doi: {
      type: String,
    },

    authors: {
      type: String,
    },

    issue: {
      type: Number,
    },
    article: {
      type: String,
    },

    revised: {
      type: String,
    },

    received: {
      type: String,
    },
    accepted: {
      type: String,
    },
    published: {
      type: String,
    },
    abstract: {
      type: String,
    },
    heading: {
      type: String,
    },
    keywords: {
      type: String,
    },
    reference: {
      type: String,
    },
    pdfdata: {
      type: Object,
    },
    destination: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const CURRENTISSUE = mongoose.model("CURRENTISSUES", UserSchema);

export default CURRENTISSUE;
