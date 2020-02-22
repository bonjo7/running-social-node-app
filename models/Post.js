const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    text:{
        type: String,
        required: true
    },
    username: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    likes: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        }
    }],
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        text: {
            type: String,
            required: true
        },
        username: {
            type: String
        },
    }],

})

module.exports = Post = mongoose.model('Post', PostSchema);