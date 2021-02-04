const mongoose = require("mongoose");
require('dotenv').config();

// mongodb setup
const MONGODB = process.env.MONGODB_HOST
// console.log(MONGODB)

var db = mongoose.connect(MONGODB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

// mongoose.connection.on("open",()=>{
//     db.dropDatabase();
// })



// debug settings
// process.env.DEBUG && mongoose.set('debug', true);

module.exports  = db;