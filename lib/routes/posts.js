const express = require('express')
const router = express.Router();
const auth = require('../../middleware/auth');
const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/user');


//Create post
router.get('/', auth, async (req, res) => {
     const user = await User.findById(req.user.id);

     try{
     const newPost = new Post ({
         user: req.user.id,
         text: req.body.text,
         username: user.name
     });

     const post = await newPost.save();

     res.json(post);
    }
    catch(err){
        console.error(err.mesage);
      res.status(500).send("Server Error");
    }
});

//Show all posts
router.get('/allposts', auth, async (req, res) => {
    
    try{
        const posts = await Post.find();

        res.json(posts);
    }
   catch(err){
        console.error(err.mesage);
        res.status(500).send("Server Error");
   }
});

module.exports = router;