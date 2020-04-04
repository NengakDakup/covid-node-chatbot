const express = require('express');
// const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const dotenv = require('dotenv');
dotenv.config();

// Load the routes from the api
const incoming = require('./routes/api/incoming');


// Initialize the app
const app = express();


// Enable cors middleware for enabling cross origin requests
app.use(cors());


// Body parser middleware for parsing requests to json formats
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


// Load the routes into the application
app.use('/api/incoming', incoming);


// Select the port for the application
const port = process.env.PORT || 5000;


// Listen on the selected ports for any incoming requests
app.listen(port, () => {
    console.log(`Server has started on port ${port}`);
})