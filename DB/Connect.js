import mongoose from "mongoose";
const db = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://ijres_1234:infodazz_ijres.@cluster0.mi9vc6o.mongodb.net/infodazz"
    );
    console.log("Db connection established.");
  } catch (error) {
    console.log("DB Error: ", error);
  }
};
export default db;
