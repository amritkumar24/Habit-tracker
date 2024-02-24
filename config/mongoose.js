// This code establishes a connection to a Mongodb database using mongoose.

const mongoose = require('mongoose');
const mongoLink = require('../mongodburi');

mongoose.connect(mongoLink);

const dataBase = mongoose.connection;

dataBase.on('error', function(){
    console.error('Error in connecting to database');
});

dataBase.once('open', function(){
    console.log('Database connection established');
});

// it exporting database connection for external use.
module.exports = dataBase;

