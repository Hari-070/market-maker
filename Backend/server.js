const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
connectDB();

const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());

app.use(express.json());
app.use(cors());
app.use("/",require("./routes/loginRoutes.js"));
app.use("/home", require("./routes/homeRoutes.js"));
app.use("/profile",require("./routes/bookingRoutes.js"))
const port = process.env.PORT || 5002;
app.listen(port, () => {
  console.log(
    `Server Running in ${process.env.NODE_MODE} Mode on port ${process.env.PORT}`
      .bgCyan.white
  );
});

