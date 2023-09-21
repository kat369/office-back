import mongoose from "mongoose";
const HomeSchema = new mongoose.Schema(
  {
    callmonthstart: {
      type: String,
    },
    callmonthend: {
      type: String,
    },
    callyear: {
      type: Number,
    },
    articleemail: {
      type: String,
    },
    lastdate: {
      type: String,
    },
    lastmonth: {
      type: String,
    },
    lastyear: {
      type: String,
    },
    editorname: {
      type: String,
    },
    department: {
      type: String,
    },
    place: {
      type: String,
    },
eissn: {
      type: String,
    },
    frequency: {
      type: String,
    },
    factor: {
      type: Number,
    },
    lang: {
      type: String,
    },
    accep: {
      type: String,
    },
    decisiondays: {
      type: String,
    },
    publicationdays: {
      type: Number,
    },
    coverage: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("home", HomeSchema);

