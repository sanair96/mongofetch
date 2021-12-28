const mongoose = require("mongoose");

//define structure of the collection
const records = new mongoose.Schema({
  key: String,
  createdAt: { type: String, default: Date.now() },
  counts: [Number],
  value: String,
});

// export interface for collection to database
module.exports = mongoose.model("records", records);
