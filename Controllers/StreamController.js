const fs = require("fs");
const path = require("path");
const moment = require("moment");
const videoQueue = require("../Jobs/VideoQueue");
const { createDir } = require("../utility/Storage");
const { RawStream } = require("../Models");
const redis_client = require("../redis");


let StreamController = {
    playStream: async (req, res) => {
        
    },
    store: async (req, res) => {

            let content_id = req.params.content_id;
            let date =  moment();
            // Make sure that he upload path exits

            // init Raw stream
            let rawStream = new RawStream();

            // storage path 
            let media_path = path.join(upload_path, `original-upload/${date.year()}/${date.month() + 1}/${date.date()}`   );

            // create dir recursivly
            createDir(media_path);

            req.pipe(req.busboy);
            req.busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
                let new_filename = content_id + path.extname(filename);
                let path_ = path.join(media_path,new_filename);

                // set mediatype and path
                rawStream.mediaType = mimetype;
                rawStream.path = path_

                const fstream = fs.createWriteStream(path_);
                file.pipe(fstream)
                fstream.on("error", (err) => {
                    console.log(err);
                    res.status(500).json({
                        errors: [{
                            message: "Somthing went wrong"
                        }]
                    });
                })
                require.main
                fstream.on("close", async () => {
                    let state = fs.statSync(path_);
                    rawStream.size = state.size;
                    await rawStream.save();
                    let content = req.content
                    content.raw_stream = rawStream._id;
                    await content.save();
                    let job = await videoQueue.add({
                        content:content,
                        rawStream:rawStream
                    });
                    
                    res.status(200).json({
                        success: true,
                        result: rawStream
                    });
                });

            });
        

    },
    get_stream_status:async(req,res)=>{

    }
}

module.exports = StreamController;