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
const cors = require('cors');


// set up dependencies
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/', mainRoutes);
app.use(logger('dev'));
app.listen(port, (request, respond) => {
    console.log(`Our server is live on ${port}. Yay!`);
});
// set up mongoose
mongoose.set('useFindAndModify', false);
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=> {
    console.log('Database connected');
  })
  .catch((error)=> {
    console.log('Error connecting to database');
  });

