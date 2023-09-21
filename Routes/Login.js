import bcrypt from "bcrypt";
import Joi from "joi";
import passwordComplexity from "joi-password-complexity";
import ADMINJOURNAL from "../Models/Login.js";
import express from "express";
const router = express.Router();

router.post("/api/login", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const user = await ADMINJOURNAL.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send("Invalid email or password");

    // const token = user.generateAuthToken();
    // res.status(200).send({data:token,datas:req.body.email, message: "logged in successfully" });
    res
      .status(200)
      .send({ datas: req.body.email, message: "logged in successfully" });

    // console.log(token);
  } catch (error) {
    res.status(500).send({ message: "internal server" });
    console.log(error);
  }
});

const validate = (adminjournal) => {
  const schema = Joi.object({
    email: Joi.string().email().required().label("email"),
    password: passwordComplexity().required().label("password"),
  });
  return schema.validate(adminjournal);
};
export default router;
