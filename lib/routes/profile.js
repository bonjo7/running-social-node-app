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
    profileAttributes.user = req.user.id;
    profileAttributes.runningclub = runningclub.charAt(0).toUpperCase() + runningclub.slice(1);
    profileAttributes.clubwebsite = clubwebsite;
    profileAttributes.location = location.charAt(0).toUpperCase() + location.slice(1);
    profileAttributes.distance = distance;
    profileAttributes.fitnessinterest = fitnessinterest.split(',').map(fitnessinterest => fitnessinterest.trim());
    profileAttributes.bio = bio;
    profileAttributes.blog = blog;
    profileAttributes.racename = racename;
    profileAttributes.racelocation = racelocation;
    profileAttributes.racedate = racedate;
    profileAttributes.racetime = racetime;
    

    profileAttributes.social = {};
    profileAttributes.social.twitterusername = twitterusername;
    profileAttributes.social.instausername = instausername;

    try { 

        //Update profile
        let profile = await Profile.findOne({ user: req.user.id});

        if(profile) {
            profile = await Profile.findOneAndUpdate(
                { user: req.user.id }, 
                { $set: profileAttributes}, 
                { new: true});

                return res.json(profile);
        }

        //Create profile
        profile = new Profile(profileAttributes);

        await profile.save();
        res.json(profile);

    } catch(err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }

    
});

//Route to get all profiles
router.get('/', async(req, res) => {

    try {
        const allProfiles = await Profile.find().populate('user', ['name', 'email']);
        console.log(allProfiles);
        res.json(allProfiles);

    } catch (err) {
        console.error(err.mesage);
        res.status(500).send('Server Error');
    }
});

module.exports = router;