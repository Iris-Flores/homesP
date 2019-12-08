var express = require('express');
var HOME = require("../../../../database/collections/home");
var router = express.Router();
//var KEYSV = Vecindariobj.keysV;
//var Vecindario = Vecindariobj.neighborhood;
//registro de nuevas casa
router.post("/home", async(req, res, next) => {
  var paramsH = req.body;
  // no repite vecindario
  var docs = await HOME.find({img: paramsH.img});
  if(docs.length >= 1){
    res.status(300).json({
      "msn":"imagen repetida"
    });
    return;
  }
  var homes = new HOME(paramsH);
  homes.save().then(() => {
    res.status(200).json(paramsH);
  });
});
//listar vecindario
router.get("/home", (req, res, next) => {
  var paramsH = req.query;
  var SKIP = 0;
  var LIMIT = 10;
  var order = 1;
  var filter = {};
  if(paramsH.skip){
    SKIP = parseInt(paramsH.skip);
  }
  if(paramsH.limit){
    LIMIT = parseInt(paramsH.limit);
  }
  if(paramsH.order){
    order = parseInt(paramsH.order);
    console.log(order);
  }
  if(paramsH.direccion){
    filter["direccion"]= paramsH.direccion;
  }
  if(paramsV.id){
    filter["_id"]= paramsV.id;
  }
  HOME.find(filter).skip(SKIP).limit(LIMIT).sort({direccion : order}).exec((err, docs) => {
    if(err) {
      res.status(200).json({
        "msn":"error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});

var router = express.Router();
module.exports = router;
