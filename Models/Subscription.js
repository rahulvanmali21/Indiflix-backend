const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const subscriptionSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    code: {
        type: String,
        required: true,
        unique: true
    },
    descrption: {
        type: String,
        required: true,
    },
    cost:{
        type: String,
        required: true,
    },

    meta: Object,
}, {
    timestamps: true
}
)

module.exports =  mongoose.model('subscription', subscriptionSchema);