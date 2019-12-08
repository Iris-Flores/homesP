const mongoose = require("../connect");
var userSchema = {
  img : String,
  name : String,
  password : String,
  email : String,
  rols : Array,

};
var user = mongoose.model("user", userSchema);
module.exports = {user: user, keys : ["name", "password", "email", "img"]};
