const moongoose = require('mongoose');

const ProfileSchema = new moongoose.Schema({

    user: {
        type: moongoose.Schema.Types.ObjectId,
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
            type: Date
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

module.exports = Profile =moongoose.model('profile', ProfileSchema);