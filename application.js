const express = require('express');
const DB = require('./db/db');

const dotenv = require('dotenv');
dotenv.config();

//Initialize app variable with express
const app = express();

//Set port value for app to run on if env var is unavailable default to 3001
const PORT = process.env.PORT || 3001;
//Define enviornment from env var, default dev
const ENV = process.env.APP_ENV || 'dev';

DB();

//Get request to send data to the browser
app.get('/', (req, res) => res.send('Node application is running successfully'));

//Pass in port with function call back 
app.listen(PORT, () => console.log('App started at: ' + new Date() 
    + '\nOn port: ' 
    + PORT + '.\nEnvoirnment: ' 
    + ENV ));