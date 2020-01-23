const express = require('express');

const app = express();

const port = process.env.PORT || 3001;

app.get('/', (req, res) => res.send('Node application is running successfully'));

app.listen(port, () => console.log('App started at: ' + new Date() + ' on port: ' + port));