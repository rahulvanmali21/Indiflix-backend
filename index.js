const http = require("http");
const path = require("path");
require('dotenv').config();
const app = require("./app");




// set global root dir
global.appRoot = path.resolve(__dirname);

global.upload_path = path.join(__dirname,process.env.MEDIA_PATH || "storage");



// set server PORT
app.set('port', process.env.PORT || 8000);




// create http server
var server = http.createServer(app);



// starts the server
server.listen(app.get('port'), function () {
    console.log("\x1b[0m");
    console.log('\x1b[33m%s\x1b[0m',`server started on port ${app.get('port')}`);
});

module.exports = app;