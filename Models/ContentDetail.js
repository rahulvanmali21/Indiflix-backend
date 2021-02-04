const mongoose = require("mongoose");
const { Schema } = require("mongoose");
const ContentDetailSchema = new Schema({

    title: {
        type: String,
        required: true,
        unique: true
    },
    content_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'content'
    },
    plot: {
        type: String,
        required: true,
    },
    full_plot: {
        type: String,
        required: true,
    },
    year:Number,
    directors: Array,
    cast: Array
},{
    timestamps: true,
});

exports.ContentDetail = mongoose.model('content_detail', ContentDetailSchema);