const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },

    runningclub: {
        type: String
    },

    clubwebsite: {
        type: String
    },

    location: {
        type: String
    },

    distance: {
        type: String,
        required: true
    },

    fitnessinterest: {
        type: [String],
        required: true
    },

    bio: {
        type: String
    },

    blog: {
        type: String
    },

    races: [
        {
        racename: {
            type: String
        },
        racelocation: {
            type: String
        },
        racedate: {
            type: String
        },
        racetime : {
            type: String
        }
    }
    ],

    social: {
        twitterusername: {
            type: String
        },
        instausername: {
            type: String
        },
    }
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);