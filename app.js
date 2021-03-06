require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();
const authenticationRouter = require("./routes/authentication.js");
const blogRouter = require("./routes/blog.js");
const commentsRouter = require("./routes/comments.js");

const dbURI = process.env.MONGO_DB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("success"))
  .catch();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use("/user", authenticationRouter);
app.use("/blog", blogRouter);
app.use("/comments", commentsRouter);

app.use((err, req, res, next) => {
  res.status(500).json({ err: err });
});

app.listen(process.env.PORT || 5000);
