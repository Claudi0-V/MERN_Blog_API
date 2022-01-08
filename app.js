require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

const app = express();
const dbURI = process.env.MONGO_DB_URI;
mongoose
  .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("success"))
  .catch();

app.use(express.json());



app.listen(process.env.PORT || 5000);
