const fs = require("fs");

const createDir = (targetdir) => {

    try {
        let dir_ = fs.statSync(targetdir);

    } catch (err) {
        if (err.code === 'ENOENT') {
            fs.mkdirSync(targetdir, {
                recursive: true
            });
        } else {
            throw err;
        }
    }
}


module.exports = {
    createDir
}