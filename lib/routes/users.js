const express = require('express');
const router = express.Router();
// Bring in user model which will allow to create user
const User = require('../../models/user');
// Bring in jsonwebtoken which will grant user access to protected routes
const webToken = require('jsonwebtoken');
// Bring in bcrypt to allow hashing user password
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

router.post('/', async (req, res) => {

    console.log(req.body);

    const {name, email, password} = req.body;

    try{

        // Vaildate that the user exists or not
        let user = await User.findOne({email})

        if(user){
            return res
          .status(400)
          .json({ errors: [{ msg: 'Sorry ' + name + ' User already exists with the email ' + email }] });
            // console.log('User with the email ' + email + ' already exists');
            // return res.send('Sorry ' + name + ', a user with the email ' + email + ' already exists');
        }

        user = new User({
            name,
            email,
            password
        })

        // Encrypt password using bcruypt
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // Return the users json web token
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