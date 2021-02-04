const mongoose = require("mongoose");
const {
    Schema
} = require("mongoose");
const ContentSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'content'
    },
    description: {
        type: String,
        required: true,
    },
    tags: Array,
    stream:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'stream'
    },
    raw_stream:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'raw_stream'
    },
    content_type: {
        type: String,
        enum: ['MOVIE', 'TV_SHOW', 'EPISODE', "SEASON"],
        default: 'MOVIE'
    },
    genre: [{
        type: String,
        enum: ['Action', 'Adventure', 'Thriller', "Horror", "Documentary", "Romance", "Drama","History"],
        required: true
    }],
    poster:{
        type:String,
        unique:true,
    },
    banner:{
        type:String,
        unique:true,
    },
    preview:{
        type:String,
        unique: true
    },
}, {
    timestamps: true,
})

module.exports =  mongoose.model('content', ContentSchema);