//Importing Libraries
const express = require("express");
const mongoose = require("mongoose");

require("dotenv").config();
const cors = require("cors");
const path = require("path");
const port = 7500;

mongoose.connect("mongodb://root:root@mongo:27017/music_db?authSource=admin");

//Initalizing the express app
const app = express();

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

//Importing the track routes module
const track = require("./routes/track.routes");
//Importing the auth routes module
const auth = require("./routes/auth.routes");
const view = require("./routes/view.routes");
//Adding Node features
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cors());

app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "/public")));

app.use("/", view);
//using the track route
app.use("/catalog", track);
//using the auth route
app.use("/api/auth", auth);

//Run Node APP
module.exports = app;
