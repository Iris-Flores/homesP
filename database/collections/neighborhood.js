const mongooseN = require("../connect");
var neighborSchema = {
  nameNeighborhood : String,
  img : String
};
var neighborhood = mongooseN.model("neighborhood", neighborSchema);
module.exports = {neighborhood : neighborhood, keysV: ["nameNeighborhood", "img"]};
