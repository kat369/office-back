import express from "express";
const router = express.Router();
import Index from "../Models/indexing.js";

router.post("/index", async (req, res) => {
  try {
    let index = await new Index({ ...req.body }).save();
    res.status(201).send({ message: "data has been added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      data: error,
    });
  }
});

router.get("/allindex", async (req, res) => {
  try {
    Index.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

export default router;
