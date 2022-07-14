const dotenv = require("dotenv");
const mongoose = require("mongoose");

const db_link = process.env.DB_LINK;

mongoose
  .connect(db_link)
  .then((db) => console.log("db is connected"))
  .catch((err) => {
    console.log(err.message);
  });
