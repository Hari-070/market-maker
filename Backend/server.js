const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
require('colors');

dotenv.config();

const connectDB = require('./config/db');
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/loginRoutes');
app.use('/', authRoutes); 

const port = process.env.PORT || 5006;
app.listen(port, () => {
  console.log(`Server Running in ${process.env.NODE_MODE} Mode on port ${port}`.bgCyan.white);
});
  