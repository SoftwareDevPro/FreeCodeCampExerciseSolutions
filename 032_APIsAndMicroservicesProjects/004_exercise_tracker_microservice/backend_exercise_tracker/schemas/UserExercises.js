

const mongoose = require("mongoose");
const { Schema } = mongoose;

const userExercisesSchema = new Schema({
  username: String,
  description: String,
  user_id: String,
  duration: Number,
  date: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserExercise', userExercisesSchema);
