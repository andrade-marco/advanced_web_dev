const mongoose = require('mongoose');

//This allows you to see database requests in terminal
mongoose.set('debug', true);

//Sets the mongoose promise library to be the built-in promise of ES2015
//This makes database requests return promises
mongoose.Promise = Promise;

//Connecting to database
mongoose.connect('mongodb://localhost:27017/warbler', {
    keepAlive: true, //Make sure connection is stable
    useNewUrlParser: true
});

//Exporting every model
module.exports.User = require('./user');
module.exports.Message = require('./message');
