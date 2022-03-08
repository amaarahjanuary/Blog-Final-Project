const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: true,
    },
    creator: {
        type: String,
        required: true,
    }

});

module.exports = mongoose.model("Post", postSchema);
