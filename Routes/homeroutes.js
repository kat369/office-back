const router = express.Router();

import Home from "../Models/home.js";
import express from "express";

router.post("/api", async (req, res) => {
  try {
    let home = await new Home({ ...req.body }).save();
    res.status(201).send({ message: "data has been added successfully." });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Internal Server Error",
      data: error,
    });
  }
});

router.get("/allpost", async (req, res) => {
  try {
    Home.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});


router.put('/:id', async(req, res) => { 

  try{

let data= await  Home.findByIdAndUpdate({_id: req.params.id}, {$set: req.body});
      res.status(200).send({
        message: "success"})
  }catch(error){
      res.status(500).send({
          message: "Internal Server Error"
      })
  }
});











export default router;
