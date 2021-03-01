// imported express module here
const express = require('express');
// imported bodyParser module here 
const bodyParser = require('body-parser');





// Set port number
const port = 4000;

// Created express instance here
const app = express();
// use bodyparse instance here

app.use(bodyParser.json());
// CORS header instance
const cors = require('cors');
app.use(cors());

app.use(express.urlencoded({ extended: true })); 
// imported api.js module here 
const api = require('./Routes/api');
// use api.js module here

app.use('/api', api);

app.listen(port, function () {
    console.log("Server running on localhost" + port);
})
