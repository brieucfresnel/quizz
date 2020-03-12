const express = require("express");
const router = require('./router');
const app = express();
const port = process.env.PORT || 8000;
const cors = require('cors');
const morgan = require('morgan');

app.use(morgan('combined')); // to get informations from requests
app.use(cors()); // to allow resquets from another application

app.use(router) // Requests processing will be defined in the file router
    .listen(port, () => console.log('Server app listening on port ' + port));

console.log("This is the back !! Let's have fun with express.js");
