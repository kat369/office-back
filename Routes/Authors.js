import express from "express";
const router = express.Router();
import Author from "../Models/author.js";

router.post("/api/author", async (req, res) => {
  try {
    let home = await new Author({ ...req.body }).save();
    res.status(201).send({ message: "data has been added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      data: error,
    });
  }
});

router.get("/allauthor", async (req, res) => {
  try {
    Author.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

export default router;
