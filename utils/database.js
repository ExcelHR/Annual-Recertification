/**
 * MongoDB configuration and server connection using mongoose 
 */
// Global Modules
const mongoose = require('mongoose');

const env = require("dotenv")
env.config({path:`../config.env`})

// Custom Modules
const MONGO_URL = process.env.DATABASE_CLUSTER;

// Create MongoDB connection object
const conn = mongoose.createConnection(MONGO_URL);

conn.mongo = mongoose.mongo;

//Error if connection fails
conn.on('error', function(err){
  console.log('Error connecting to database');
  console.log(err);
});

//On Successful connection
conn.on('connected', function(){
  console.log('Connected to database from the database util');
});

module.exports = conn;