const Queue = require('bull');
const path = require("path");
const {
    Stream,
    RawStream,
    Content
} = require('../Models');
const redis_client = require('../redis');
const mediaInfo = require('../services/mediaInfo');
const VideoEncoder = require("../services/VideoEncoder");
require('dotenv').config();

const REDIS = process.env.REDIS || 'redis://127.0.0.1:6379'

const videoQueue = new Queue('video transcoding', REDIS);


videoQueue.process(async (job, done) => {
    let {
        content,
        rawStream
    } = job.data;
    let input = rawStream.path;
    rawStream.meta = await mediaInfo(input)
    let targetdir = path.join(upload_path, content._id.toString(), rawStream._id);
    let name = path.basename(input, path.extname(input));


    let encoder = new VideoEncoder()
    encoder.setInput(input)
        .setTargetdir(targetdir)
        .setName(name)
        .init();

    encoder
        .on("progress", (progress) => {
            job.progress(Math.round(progress.percent));
        })
        .on("error", (err) => {
            console.log(err);
        })
        .on("end", async(result) => {
            let stream = new Stream();
            stream.path = result.dash_path.replace(upload_path,"");
            stream.webm_path = result.fallback_path.replace(upload_path,"");
            stream_ = await stream.save();
            let content_ = await Content.findById(content._id);            
            content_.stream = stream_._id;
            content_.preview = result.gif_path.replace(upload_path,"");
            await content_.save();
            redis_client.del(content_.id,function (err,reply) {
                console.log(err);
                console.log(reply);
            });
            done();
        });
        encoder.execute();
});


// videoQueue.on("completed", async (job, result) => {


// });


module.exports = videoQueue;