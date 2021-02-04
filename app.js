const express = require("express");
const cors = require("cors");
// const db = require("./db");
const db = require("./database/db");
const morgan = require('morgan');
const busboy = require('connect-busboy');
require('dotenv').config();



const app = express();
// debugs
process.env.NODE_ENV !== 'production' && app.enable('trust proxy') && app.use(express.static('public'));
app.use(express.static('storage'));

//db connection
db.then(() => {
    console.log("\x1b[5m", "MongoDB connected");
    console.log("\x1b[0m");

}).catch(_ => {
    console.log("\x1b[41m", _);
    console.log("\x1b[0m");

});



// for cors errors  
app.use(cors());

// loggin
app.use(morgan("tiny"));

// parsing json in request
app.use(express.json());

// parses incoming requests with urlencoded payloads
app.use(express.urlencoded({
    extended: true
}));


// set for large file upload
app.use(busboy({
    highWaterMark: 2 * 1024 * 1024, // Set 2MiB buffer
}));


// routes
require('./Routes/index')(app);

// redis client setup
require("./redis");

module.exports = app