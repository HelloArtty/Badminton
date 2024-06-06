const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const authRouter = require("./routes/auth.route.js");
const dataRouter = require("./routes/data.route.js");
dotenv.config();

// Connect to DB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

const app = express();
const port = 5000;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use("/backend/auth", authRouter);
app.use("/backend/data", dataRouter);
