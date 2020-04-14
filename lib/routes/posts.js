const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Post = require("../../models/Post");
const Profile = require("../../models/Profile");
const User = require("../../models/user");

//Create post
router.post("/createpost", auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const newPost = new Post({
      user: req.user.id,
      text: req.body.text,
      username: user.name,
    });

    const post = await newPost.save();

    res.json(post);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }

  // const {
  //     text,
  //     username
  //   } = req.body;

  //   const postAttributes = {};
  //   postAttributes.user = req.user.id;
  //   postAttributes.text = req.body.text,
  //   postAttributes.username = user.name

  //   try {
  //     //Update profile
  //     let post = await Post.findOne({ user: req.user.id });

  //     if (post) {
  //       post = await Post.findOneAndUpdate(
  //         { user: req.user.id },
  //         { $set: postAttributes },
  //         { new: true }
  //       );

  //       return res.json(post);
  //     }

  //     //Create profile
  //     post = new Post(postAttributes);

  //     await post.save();
  //     res.json(post);
  //   } catch (err) {
  //     console.error(err.message);
  //     res.status(500).send("Server Error");
  //   }
});

//Show all posts
router.get("/allposts", auth, async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    res.json(posts);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

//Display post by ID
router.get("/posts/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ msg: "This post can not be found" });
    } else {
      res.json(post);
    }
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "This post can not be found" });
    } else {
      console.error(err.mesage);
      res.status(500).send("Server Error");
    }
  }
});

//Edit post by ID
router.put("/editpost/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res.status(500).json({ msg: "Not authorised to edit this post" });
    } else {
      console.log(post);

      post.text = req.body.text;

      post.save();

      res.json(post);
    }

    res.json(posts);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "This post can not be found" });
    } else {
      console.error(err.mesage);
      res.status(500).send("Server Error");
    }
  }

  //     const update = {
  //         text: req.body.text,
  //     }

  //     // try{
  //         const post = await Post.findById(req.params.id);

  //     //     if(!post){
  //     //         return res.status(404).json({msg : 'This post can not be found'})
  //     //     }else{

  //             const postID = await Post.findOneAndUpdate(
  //                 update
  //               );
  //               postID.save();
  //             //   console.log(post);
  //               return res.json(postID);

  // //     }
  // //    catch(err){
  // //     if(err.kind === 'ObjectId'){
  // //         return res.status(404).json({msg : 'This post can not be found'})
  // //     }else{
  // //         console.error(err.mesage);
  // //         res.status(500).send("Server Error");
  // //     }
  // //     }
});

//delete Post
router.delete("/deletepost/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (post.user.toString() !== req.user.id) {
      return res
        .status(404)
        .json({ msg: "Not authorised to remove this post" });
    } else {
      await post.remove();
      res.json("Post successfully deleted and removed");
    }

    res.json(posts);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).json({ msg: "This post can not be found" });
    } else {
      console.error(err.mesage);
      res.status(500).send("Server Error");
    }
  }
});

//Add comment to a post
router.post("/comment/:id", auth, async (req, res) => {
  const user = await User.findById(req.user.id);
  const post = await Post.findById(req.params.id);

  try {
    const newComment = {
      user: req.user.id,
      text: req.body.text,
      username: user.name,
    };

    post.comments.unshift(newComment);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

//Add a positive to a post
router.put("/positive/:id", auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (
      post.positives.filter(
        (positive) => positive.user.toString() === req.user.id
      ).length > 0
    ) {
      return res
        .status(400)
        .json({ msg: "You already gave this post some kudo's" });
    } else {
      post.positives.unshift({ user: req.user.id });
      await post.save();
      res.json(post.positives);
    }
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

//Edit a comment
router.put("/deletecomment/:id", auth, async (req, res) => {
  //Todo
});

module.exports = router;
