const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const mongo_conn_url = process.env.MONGO_CONN_URL || 'mongodb+srv://fyp:yMdpIVonik02mDH8@fyp-xyuk4.mongodb.net/running-social-node-app?retryWrites=true&w=majority';

/*
Methot to connect to mongo cluster
Wrap in try block
Due to server deprecation now required to add unifiedTopology
*/
const connectMongoDB = async() => {
    try {
        await mongoose.connect(mongo_conn_url, {
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('Successfully conneted to mongoDB: ' + mongo_conn_url)
    }
    catch(err) {
        console.log('Unable to connect to mongoDB' + err.message)
        return (err)
    }
};

module.exports = connectMongoDB