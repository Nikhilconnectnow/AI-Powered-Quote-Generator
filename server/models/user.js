// const mongoose = require("mongoose");

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   quotes: { type: [String], default: [] },
//   favorites: [{
//     quote: String,
//   }]
// });

// module.exports = mongoose.model("User", userSchema);
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  quotes: { type: [String], default: [] },
  favorites: [{
    quote: { type: String },
    category: { type: String }   
  }]
});

module.exports = mongoose.model("User", userSchema);
