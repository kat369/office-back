import mongoose from "mongoose";
import Joi from "joi";
import jwt from "jsonwebtoken";
import passwordComplexity from "joi-password-complexity";
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },

  email: {
    type: String,
    require: true,
  },

  password: {
    type: String,
    require: true,
  },
});
userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_PRIVATEKEY_ADMIN);
  return token;
};
export const validate = (adminsignup) => {
  const schema = Joi.object({
    name: Joi.string().required().label("name"),
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(adminsignup);
};
const ADMINJOURNAL = mongoose.model("adminsignup", userSchema);

export default ADMINJOURNAL;
