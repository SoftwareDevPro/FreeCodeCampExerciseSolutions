
const mongoose = require("mongoose");
const { Schema } = mongoose;

const urlShortSchema = new Schema({
  original_url: String,
  //u: String,
  short_url: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UrlShort', urlShortSchema);
