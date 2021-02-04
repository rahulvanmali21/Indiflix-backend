let {ffprobe} = require('fluent-ffmpeg');


const mediaInfo=(file_name)=>{
    return new Promise((resolve,reject)=>{
        ffprobe(file_name, function(err, data) {
            if(err) reject(err);
            resolve(data);
        });
    });
}

module.exports = mediaInfo;


// test