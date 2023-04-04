const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const morgan = require("morgan");
const { body } = require("express-validator");
const chalk = require("chalk");

const userRoutes = require("./routes/userRouter");
const app = express();

const error = chalk.bold.red;
const warning = chalk.hex("#FFA500");
console.error(error("this is an error"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use("/api", userRoutes);
const port = 5000;

//connecting to DB
const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://Soumi:soumi1234@atlascluster.81pwmyq.mongodb.net/anisulcrud"
    );
    console.log("db is connected");
  } catch (error) {
    console.log("db is not connected");
    console.log(error);
    process.exit(1);
  }
};

//creating schema and model
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name3 is required"],
  },
  image: {
    type: String,
    required: [true, "user image is required"],
  },
});

const User = mongoose.model("Users", userSchema);

//file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const name = Date.now() + "-" + file.originalname;
    cb(null, name);
  },
});

const upload = multer({ storage: storage });

app.get("/test", (req, res) => {
  res.status(200).send("testing app");
});
app.get("/register", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});

app.post("/register", upload.single("image"), async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });
    await newUser.save();
    res.status(200).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(port, async () => {
  console.log(
    chalk.underline.blue.bgRed.bold(
      `server running at http://localhost:${port}`
    )
  );
  await connectDB();
});
