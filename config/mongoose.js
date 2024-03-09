// This code establishes a connection to a Mongodb database using mongoose.

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI);

const dataBase = mongoose.connection;

dataBase.on('error', function(){
    console.error('Error in connecting to database');
});

dataBase.once('open', function(){
    console.log('Database connection established');
});

// it exporting database connection for external use.
module.exports = dataBase;

