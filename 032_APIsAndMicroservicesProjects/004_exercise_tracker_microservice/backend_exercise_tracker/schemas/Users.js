

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
    // _id
    username: String,
    userId: String
});

module.exports = mongoose.model('User', userSchema);

