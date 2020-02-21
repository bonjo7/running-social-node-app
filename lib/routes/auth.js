const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/user');
// Bring in jsonwebtoken which will grant user access to protected routes
const webToken = require('jsonwebtoken');
// Bring in bcrypt to allow hashing user password
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

router.get('/', auth, async (req, res) => {
    try{
        const user = await User.findById(req.user.id);
        res.json(user);
    } catch(err){
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

router.post('/', async (req, res) => {

    console.log(req.body);

    const {email, password} = req.body;

    try{

        // Vaildate that the user exists or not
        let user = await User.findOne({email})

        if(!user){
            console.log('User with the email ' + email + ' already exists');
            return res.send('A user with this email address does not exist');
        }

        const validEmail = await bcrypt.compare(password, user.password);
        if(!validEmail) {
            return res.status(400).json({ msg: 'Wrong password, try again'});
        }
        
        const userPayload = {
            user: {
                id: user.id,
                name: user.name
            }
        }

        webToken.sign(
            userPayload, 
            process.env.WEB_TOKEN,
            (err, token) => {
                if(err) {throw err
                }else{
                res.json({token});
                console.log('The user, ' + name + ' has successfully registered');
                }
            });

         

    } catch(err){
        console.log(err.message);
    }   

    
}
);

module.exports = router;