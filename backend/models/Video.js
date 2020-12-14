const mongoose = require('mongoose');
const Schema = require('mongoose');

const videoSchema = mongoose.Schema(
    {
        writter: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        title: {
            type: String,
            maxlength: 50,
        },
        description: {
            type: String,
        },
        privacy: {
            type: Number,
        },
        filePath: {
            type: String,
        },
        category: {
            type: String,
        },
        duration: {
            type: String,
        },
        thumbnail: {
            type: String,
        },
        views: {
            type: Number,
            default: 0,
        },
    },
    { timestamps: true }
);

const Video = mongoose.model(
    'Video',
    videoSchema
);
module.exports = { Video };
