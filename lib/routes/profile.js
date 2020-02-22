const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const Profile = require("../../models/Profile");
const User = require("../../models/user");

// router.get('/', (req, res) => res.send('Profile route'));

//Route which allows user to access their profile
router.get("/myprofile", auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate(
      "user",
      "name"
    );

    if (!profile) {
      return res.status(400).json("No profile associated with user");
    }
    console.log("User profile: " + profile);
    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send("Server Error");
  }
});

//Route to allow user to create or update their profile
router.post(
  "/",
  [],
  auth,

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
    profileAttributes.runningclub =
      runningclub.charAt(0).toUpperCase() + runningclub.slice(1);
    profileAttributes.clubwebsite = clubwebsite;
    profileAttributes.location =
      location.charAt(0).toUpperCase() + location.slice(1);
    profileAttributes.distance = distance;
    profileAttributes.fitnessinterest = fitnessinterest.split(",").map(fitnessinterest => fitnessinterest.trim());
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
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileAttributes },
          { new: true }
        );

        return res.json(profile);
      }

      //Create profile
      profile = new Profile(profileAttributes);

      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

//Route to get all profiles
router.get("/all", async (req, res) => {
  try {
    const allProfiles = await Profile.find().populate("user", [
      "name",
      "email"
    ]);
    console.log(allProfiles);
    res.json(allProfiles);
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

//Route to get profile associated with user id
router.get("/user/:user_id", async (req, res) => {
  try {
    const profileID = await Profile.findOneAndUpdate({
      user: req.params.user_id
    }).populate("user", ["name", "email"]);

    if (!profileID) {
      console.log("No profile available for the selected user");
      return res
        .status(400)
        .json({ msg: "No profile available for the selected user" });
    } else {
      console.log(profileID);
      res.json(profileID);
    }
  } catch (err) {
    console.error(err.mesage);

    if (err.kind == "ObjectId") {
      return res
        .status(400)
        .json({ msg: "No profile available for the selected user" });
    } else {
      res.status(500).send("Server Error");
    }
  }
});

//Delete user and profile
router.delete("/deleteaccount", async (req, res) => {
  // let profile = await Profile.findOne({ user: req.user.id});
  // let user = await User.findOne({email: req.params.email});

  try {
    // if(!profile && !user){
    await User.findOneAndRemove({ _id: req.params.id });
    await Profile.findOneAndRemove({ user: req.params.id });
    console.log("Account successfully deleted");
    res.json("Account successfully deleted");
    // }else{
    //     console.log('No account found');
    //     res.json('No account found');
    // }
  } catch (err) {
    console.error(err.mesage);
    res.status(500).send("Server Error");
  }
});

//Add reaces to user profile
router.put("/race", auth, async (req, res) => {
  const { racename, racelocation, racedate, racetime } = req.body;

  const newRace = {
    racename,
    racelocation,
    racedate,
    racetime
  };

  try {

    let profile = await Profile.findOne({ user: req.user.id });
    profile.races.unshift(newRace);

    await profile.save();

    console.log(profile);
    res.json(profile);

  } catch (err) {

    console.error(err.mesage);
    res.status(500).send("Server Error");

  }
});

//Delete user race info
router.delete("/deleterace/:race_id", auth, async (req, res) => {

    try {

        let profile = await Profile.findOne({ user: req.user.id});

        const rmRaceID = profile.races.map(item => item.id).indexOf(req.params.race_id);

        profile.races.splice(rmRaceID, 1);

        await profile.save();

        res.json(profile);
        console.log(profile);
      
    } catch (err) {
      console.error(err.mesage);
      res.status(500).send("Server Error");
    }
  });

module.exports = router;
