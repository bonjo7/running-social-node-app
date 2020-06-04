const express = require("express");
const DB = require("./db/db");
const bodyParser = require("body-parser");

var cors = require("cors");

const dotenv = require("dotenv");
dotenv.config();

//Initialize app variable with express
const app = express();

//Set port value for app to run on if env var is unavailable default to 3001
const PORT = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || "0.0.0.0";
//Define enviornment from env var, default dev
const ENV = process.env.APP_ENV || "dev";

DB();
app.use(cors());
//Allow requests of the body to work in both urlencode and json
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Get request to send data to the browser
app.get("/", (req, res) => {
//   res.send("Node application is running successfully, in envoirnment");
  res.json({
    status: "Application Running - Version 1.2.0",
    message: "CI/CD demo Node application is running successfully, envoirnment: " + ENV,
  });
  console.log("Node application is running successfully, envoirnment: " + ENV)
  
});

//Define routes which will be used in the backend
app.use("/lib/routes/auth", require("./lib/routes/auth"));
app.use("/lib/routes/posts", require("./lib/routes/posts"));
app.use("/lib/routes/profile", require("./lib/routes/profile"));
app.use("/lib/routes/users", require("./lib/routes/users"));

//Pass in port with function call back
app.listen(PORT, () =>
  console.log(
    "App started at: " +
      new Date() +
      "\nOn port: " +
      PORT +
      ".\nEnvoirnment: " +
      ENV +
      "Node application is running successfully, envoirnment: " + ENV
  )
);

module.exports = app;
