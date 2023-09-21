import express from "express";
import validate from "../Models/Login.js";
const router = express.Router();
import ADMINJOURNAL from "../Models/Login.js";
import bcrypt from "bcrypt";

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error)
      return res.status(400).send({ message: error.details[0].message });

    let user = await ADMINJOURNAL.findOne({ email: req.body.email });
    if (user)
      return res
        .status(409)
        .send({ message: "User with given email already Exist!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));

    const hashPassword = await bcrypt.hash(req.body.password, salt);

    user = await new ADMINJOURNAL({
      ...req.body,
      password: hashPassword,
    }).save();
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/alladmin", async (req, res) => {
  try {
    ADMINJOURNAL.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.get("/:ID", (req, res) => {
  try {
    ADMINJOURNAL.findOne({ email: req.params.ID }).then((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({
            message:
              "Error while retrieving an employee. Please check the data",
          });
      }

      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.get("/up/:pID", (req, res) => {
  try {
    ADMINJOURNAL.findOne({ _id: req.params.pID }).then((err, data) => {
      if (err) {
        return res
          .status(400)
          .send({
            message:
              "Error while retrieving an employee. Please check the data",
          });
      }

      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

export default router;
