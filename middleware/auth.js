const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

//Middleware module created in order to confirm is a user has a valid jws token or not
//Should the user have a token grant access to secured routes
module.exports = function(req, res, next) {
    const jwtToken = req.header('user-token-header');

    if(!jwtToken){
        return res.status(401).json({ msg : 'Access denied, no user token'});
    }

    try {
        const token = jwt.verify(jwtToken, process.env.WEB_TOKEN);

        req.user = token.user;
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid user token'});
    }
};
