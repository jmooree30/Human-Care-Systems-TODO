//Set up mongoose connection
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");
const mongoDB = process.env.DB_CONNECTION_STRING;
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
module.exports = mongoose;
