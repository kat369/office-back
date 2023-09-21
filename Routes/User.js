import express from "express";
const router = express.Router();
import mongoose from "mongoose";
import mongodb from "mongodb";
import ARTICLE from "../Models/User.js";
import CURRENTISSUE from "../Models/Current.js";
import multer from "multer";
import fs from "fs";
import THREE from "../Models/three.js";
const ARTICLES = mongoose.model("ARTICLES");
const CURRENTISSUES = mongoose.model("CURRENTISSUES");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = `../project2/public/uploads/Volume-${req.query.volume}/Issue-${req.query.issue}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

//three


router.post("/three", async (req, res) => {
  const articledata = req.body;
  articledata.volume = +req.body.volume;
  articledata.issue = +req.body.issue;
try {
    let userS = await new THREE({ ...articledata}).save();
    res.status(201).send({ message: "data created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});



router.get("/allthree", async (req, res) => {
  try {
    THREE.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});


router.get("/files", async (req, res) => {
  try {
    const data = await ARTICLE.find({
      volume: +req.query.volume,
      issue: +req.query.issue,
    });

    if (data.length > 0) {
      res.json({ data });
    } else {
      res.json({ message: "no data found" });
    }
  } catch (error) {
    console.log(error);
  }
});

// post

router.post("/create", upload.single("pdf"), async (req, res) => {
  const articledata = req.body;
  articledata.year = +req.body.year;
  articledata.volume = +req.body.volume;
  articledata.issue = +req.body.issue;
  articledata.pdfdata = req.file;
  articledata.doi=req.body.doi;
  articledata.received = req.body.received;
try {
    const user = await ARTICLE.findOne({ article: req.body.article });
    if (user)
      return res.status(409).send("Article-ID are Already Exsist"); 
      // return res.status(409).send({ message:"Article-ID are Already Exsist"});
  const path = `../project2/public/uploads/Volume-${req.query.volume}/Issue-${req.query.issue}/${req.file.originalname}`;
    console.log(path);
    let userS = await new ARTICLE({ ...articledata, destination: path }).save();
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

router.post("/createnew", upload.single("pdf"), async (req, res) => {
  const articledata = req.body;
  articledata.year = +req.body.year;
  articledata.volume = +req.body.volume;
  articledata.issue = +req.body.issue;
  articledata.pdfdata = req.file;

  try {
    const user = await CURRENTISSUE.findOne({ article: req.body.article });
    if (user) return res.status(409).send("Article-ID are Already Exsist");

    const path = `../project2/public/uploads/Volume-${req.query.volume}/Issue-${req.query.issue}/${req.file.originalname}`;
    console.log(path);
    let userS = await new CURRENTISSUE({
      ...articledata,
      destination: path,
    }).save();
    res.status(201).send({ message: "user created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//articles get

router.get("/allarticle", async (req, res) => {
  try {
    ARTICLE.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

router.get("/get/:articleID", (req, res) => {
  try {
    ARTICLE.findOne({ article: req.params.articleID }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

//current issue get

router.get("/allissues", async (req, res) => {
  try {
    CURRENTISSUE.find().then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error", error });
  }
});

router.get("/gets/:articleID", (req, res) => {
  try {
    CURRENTISSUES.findOne({ article: req.params.articleID }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

//threee

router.get("/retrive/:volume/:issue", (req, res) => {
  try {
    ARTICLE.findOne({volume: req.params.volume,
      issue: req.params.issue
    }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { key, type } = req.query;
    console.log(key);
    console.log(type);

    if (key !== "") {
      if (type === "All") {
        const data = await ARTICLE.find({
          $or: [
            { name: { $regex: key, $options: "i" } },
            { heading: { $regex: key, $options: "i" } },
            { authors: { $regex: key, $options: "i" } },
            { article: { $regex: key, $options: "i" } },
            { keywords: { $regex: key, $options: "i" } },
            { abstract: { $regex: key, $options: "i" } },
            { reference: { $regex: key, $options: "i" } },
          ],
        });
        res.json({ data });
      } else if (type === "Keywords") {
        const data = await ARTICLE.find({
          $or: [{ keywords: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      } else if (type === "Abstract") {
        const data = await ARTICLE.find({
          $or: [{ abstract: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      } else if (type === "Authors") {
        const data = await ARTICLE.find({
          $or: [{ authors: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      } else if (type === "Article") {
        const data = await ARTICLE.find({
          $or: [{ article: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      }
      else if (type === "Title") {
        const data = await ARTICLE.find({
          $or: [{ heading: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      } else if (type === "Reference") {
        const data = await ARTICLE.find({
          $or: [{ reference: { $regex: key, $options: "i" } }],
        });
        res.json({ data });
      }
    } else {
      res.json({ message: "Enter a key word to search" });
    }
  } catch (error) {
    console.log(error);
  }
});

//.//for particular year volume issue api in client => get

router.get("/files/all", async (req, res) => {
  try {
    const data = await ARTICLE.find({
      volume: +req.query.volume,
      issue: +req.query.issue,
    });

    if (data.length > 0) {
      res.json({ data });
    } else {
      res.json({ message: "no data found" });
    }
  } catch (error) {
    console.log(error);
  }
});

//delete

router.delete("/delfile", async (req, res) => {
  try {
    await ARTICLE.deleteOne({ article: req.query.id });
    res.status(200).send({ message: `file deleted succesfully` });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

//put operation

router.post(
  "/updatesamepath/current",
  upload.single("pdf"),
  async (req, res) => {
    const articledata = req.body;
    articledata.year = +req.body.year;
    articledata.volume = +req.body.volume;
    articledata.issue = +req.body.issue;

    if (req.file === undefined) {
      try {
        let data = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          { $set: articledata }
        );
        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    } else {
      try {
        let data = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          { $set: articledata }
        );
        const path = `../project2/public/uploads/Volume-${req.query.volume}/Issue-${req.query.issue}/${req.file.originalname}`;
        let pdffile = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          { $set: { pdfdata: req.file, destination: path } }
        );

        var oldfilePath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.query.oldfile}`;
        fs.unlinkSync(oldfilePath);
        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    }
  }
);

router.post(
  "/updatediffrentpath/current",
  upload.single("pdf"),
  async (req, res) => {
    const articledata = req.body;
    articledata.year = +req.body.year;
    articledata.volume = +req.body.volume;
    articledata.issue = +req.body.issue;

    console.log(req.query.oldPath);

    if (req.file === undefined) {
      try {
        var fileoldPath = `${articledata.destination}`;
        var newdestination = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}`;
        if (!fs.existsSync(newdestination)) {
          fs.mkdirSync(newdestination, { recursive: true });
        }
        var newPath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.query.oldfile}`;

        fs.rename(fileoldPath, newPath, function (err) {
          if (err) throw err;
          console.log("Successfully moved!");
        });
        let data = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          { $set: articledata }
        );

        let pdffile = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          {
            $set: {
              destination: newPath,
              "pdfdata.path": newPath,
              "pdfdata.destination": newdestination,
            },
          }
        );

        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    } else {
      try {
        var newPath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.file.originalname}`;

        fs.unlinkSync(articledata.destination);

        let data = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          { $set: articledata }
        );

        let pdffile = await CURRENTISSUE.updateOne(
          { _id: new mongodb.ObjectId(req.query.id) },
          {
            $set: {
              pdfdata: req.file,
              destination: newPath,
            },
          }
        );

        res.json({ message: "success" });
      } catch (error) {
        console.log(error);
        res.status(500).json({ message: "try again later" });
      }
    }
  }
);

//articles

router.post("/updatesamepath", upload.single("pdf"), async (req, res) => {
  const articledata = req.body;
  articledata.year = +req.body.year;
  articledata.volume = +req.body.volume;
  articledata.issue = +req.body.issue;

  if (req.file === undefined) {
    try {
      let data = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        { $set: articledata }
      );
      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "try again later" });
    }
  } else {
    try {
      let data = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        { $set: articledata }
      );
      const path = `../project2/public/uploads/Volume-${req.query.volume}/Issue-${req.query.issue}/${req.file.originalname}`;
      let pdffile = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        { $set: { pdfdata: req.file, destination: path } }
      );

      var oldfilePath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.query.oldfile}`;
      fs.unlinkSync(oldfilePath);
      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "try again later" });
    }
  }
});

router.post("/updatediffrentpath", upload.single("pdf"), async (req, res) => {
  const articledata = req.body;
  articledata.year = +req.body.year;
  articledata.volume = +req.body.volume;
  articledata.issue = +req.body.issue;

  console.log(req.query.oldPath);

  if (req.file === undefined) {
    try {
      var fileoldPath = `${articledata.destination}`;
      var newdestination = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}`;
      if (!fs.existsSync(newdestination)) {
        fs.mkdirSync(newdestination, { recursive: true });
      }
      var newPath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.query.oldfile}`;

      fs.rename(fileoldPath, newPath, function (err) {
        if (err) throw err;
        console.log("Successfully moved!");
      });
      let data = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        { $set: articledata }
      );

      let pdffile = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        {
          $set: {
            destination: newPath,
            "pdfdata.path": newPath,
            "pdfdata.destination": newdestination,
          },
        }
      );

      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "try again later" });
    }
  } else {
    try {
      var newPath = `../project2/public/uploads/Volume-${articledata.volume}/Issue-${articledata.issue}/${req.file.originalname}`;

      fs.unlinkSync(articledata.destination);

      let data = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        { $set: articledata }
      );

      let pdffile = await ARTICLE.updateOne(
        { _id: new mongodb.ObjectId(req.query.id) },
        {
          $set: {
            pdfdata: req.file,
            destination: newPath,
          },
        }
      );

      res.json({ message: "success" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "try again later" });
    }
  }
});

//edited current

router.put('/current/:volume', async(req, res) => { 

  try{

let data= await THREE.updateMany({},{$set:{volume: +req.query.volume, issue: +req.query.issue}});
      res.status(200).send({
        message: "success"})
  }catch(error){
      res.status(500).send({
          message: "Internal Server Error"
      })
  }
});


router.get("/edit/:volume", (req, res) => {
  try {
    THREE.findOne({volume: +req.params.volume,
    }).then((data) => {
      res.status(200).send(data);
    });
  } catch (error) {
    res.status(500).send({
      message: "Internal Server Error",
    });
  }
});


export default router;
