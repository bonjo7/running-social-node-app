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

//Display post by ID
router.get('/posts/:id', auth, async (req, res) => {
    
    try{
        const post = await Post.findById(req.params.id);

        if(!post){
            return res.status(404).json({msg : 'This post can not be found'})
        }else{
        res.json(post);
        }
    }
   catch(err){
    if(err.kind === 'ObjectId'){
        return res.status(404).json({msg : 'This post can not be found'})
    }else{
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }
    }
});

//delete Post
router.delete('/deletepost/:id', auth, async (req, res) => {
    
    try{
        const post = await Post.findById(req.params.id);

        if(post.user.toString() !== req.user.id){
            return res.status(404).json({msg: 'Not authorised to remove this post'})
        }else{
            await post.remove();
            res.json('Post successfully deleted and removed');
        }

        res.json(posts);
    }
   catch(err){
    if(err.kind === 'ObjectId'){
        return res.status(404).json({msg : 'This post can not be found'})
    }else{
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }
    }
});

//Add remove a like to a post
router.post('/like/:id', auth, async (req, res) => {
    
    try{
        //ToDo
    }
   catch(err){
        console.error(err.mesage);
        res.status(500).send("Server Error");
    }
});

module.exports = router;