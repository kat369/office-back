import express from "express";

import db from "./DB/Connect.js";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./Routes/User.js";
import homeRoutes from "./Routes/homeroutes.js";
import authorRoutes from "./Routes/Authors.js";
import RegisterRoutes from "./Routes/Register.js";
import PasswordResetRoutes from "./Routes/Passwordreset.js";
import LoginRoutes from "./Routes/Login.js";
import indexRoutes from "./Routes/indexing.js";
import bodyParser from "body-parser";
dotenv.config();
db();

const app = express();
app.use(bodyParser.urlencoded({limit:'30mb',extended:true}));
app.use(bodyParser.json({limit:'30mb',extended:true}));
app.use(cors());
const PORT = 3002;

app.get("/server-admin", function (request, response) {
  response.send("Welcome to the Admin server");
});


app.use("/api", indexRoutes);
app.use("/", homeRoutes);
app.use("/", authorRoutes);
app.use("/", userRoutes);
app.use("/api/register", RegisterRoutes);
app.use("/", LoginRoutes);
app.use("/api/password-reset", PasswordResetRoutes);
app.use('public/uploads',express.static("../project2/public/uploads"))

app.listen(PORT, () => console.log(`The server started in: ${PORT} ✨✨`));
