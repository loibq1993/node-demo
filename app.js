require('dotenv').config();
// Call in installed dependencies
const express = require('express');
// set up express app
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('morgan');
const port = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;
const mainRoutes = require('./server/routes/main');

// set up dependencies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(logger('dev'));

// set up mongoose
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

