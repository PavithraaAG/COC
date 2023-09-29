const mongoose = require('mongoose');
require("dotenv").config();
const userSchema = new mongoose.Schema({
    first_name:String,
    last_name:String,
    full_name:String,
    age:Number,
    dob:String,
    address:String,
    username:String,
    password: String,
    confirm_Password:String,
});

const UserModel = mongoose.model(`${process.env.DB_COLLECTION}`, userSchema);
module.exports = UserModel;