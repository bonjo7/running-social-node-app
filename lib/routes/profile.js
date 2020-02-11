const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/user')


// router.get('/', (req, res) => res.send('Profile route'));

//Route which allows user to access their profile
router.get('/myprofile', auth, async(req, res) => {

    try {

        const profile = await Profile.findOne({ user: req.user.id}).populate(
            'user', 
            'name'
            );

            if(!profile) {
                return res.status(400).json('No profile associated with user');
            }
            console.log('User profile: ' + profile);
            res.json(profile);

    } catch(err) {

        console.log(err.message);
        res.status(500).send('Server Error');
    }

});

//Route to allow user to create or update their profile
router.post('/', [], auth,  

async (req, res) => {

    const {

        user,
        runningclub,
        clubwebsite,
        location,
        distance,
        fitnessinterest,
        bio,
        blog,
        racename,
        racelocation,
        racedate,
        racetime,
        twitterusername,
        instausername
    } = req.body;

    const profileAttributes = {};
    profileAttributes - req.user.id;
    profileAttributes.runningclub = runningclub;
    profileAttributes.clubwebsite = clubwebsite;
    profileAttributes.location = location;
    profileAttributes.distance = distance;
    profileAttributes.fitnessinterest = fitnessinterest.split(',').map(fitnessinterest => fitnessinterest.trim());
    profileAttributes.bio = bio;
    profileAttributes.blog = blog;
    profileAttributes.racename = racename;
    profileAttributes.racelocation = racelocation;
    profileAttributes.racedate = racedate;
    profileAttributes.racetime = racetime;
    profileAttributes.twitterusername = twitterusername;
    profileAttributes.instausername = instausername;

    console.log(profileAttributes);

    res.send('Skills added');

}
)

module.exports = router;