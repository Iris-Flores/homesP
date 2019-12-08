const mongooseN = require("../connect");
var neighborSchema = {
  nameN : String,
  img : String
};
var neighborhood = mongooseN.model("neighborhood", neighborSchema);
module.exports = {neighborhood : neighborhood, keysV: ["nameN", "img"]};
