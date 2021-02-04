const mongoose = require("mongoose");
const {
    Schema
} = require("mongoose");

const rawStreamSchema = new Schema({

    path: {
        type: String,
        required: true,
        unique: true
    },
    size: {
        type: Number,
        required:true,
    },
    mediaType: {
        type: String,
        required: true
    },
    meta:Object
}, {
    timestamps: true
})

exports.RawStream = mongoose.model('raw_stream', rawStreamSchema);

const streamSchema = new Schema({
    path: {
        type: String,
        required: true,
        unique: true
    },
    webm_path:{
        type: String,
        required: true,
        unique: true
    },
    meta: Object,
}, {
    timestamps: true
})

exports.Stream = mongoose.model('stream', streamSchema);