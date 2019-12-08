const mongooseHome = require("../connect");
var homeSchema = {
  imagen : [{
    url:String
  }],
  lat:String,
  lon:String,
  direccion:String,
  tipo : String,
  precio : Number,
  oferta : String,
  estado: String,
  descripcion: String,
  servicio: String,
  NumHabitaciones: Number,
  NumBanios:Number
};
var home = mongooseHome.model("home", homeSchema);
module.exports = home;
