const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');
const User = require('../../models/user')


// router.get('/', (req, res) => res.send('Profile route'));

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

module.exports = router;