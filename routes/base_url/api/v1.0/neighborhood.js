var express = require('express');
var Vecindariobj = require("../../../../database/collections/neighborhood");
var KEYSV = Vecindariobj.keysV;
var Vecindario = Vecindariobj.neighborhood;
var router = express.Router();
//create
router.post("/neighborhood", async(req, res, next) => {
  var paramsV = req.body;
  // no repite vecindario
  var docs = await Vecindario.find({nameN: paramsV.nameN, img: paramsV.img});
  if(docs.length >= 1){
    res.status(300).json({
      "msn":"nombre de vecindario e imagen incorrecto"
    });
    return;
  }
  var vecindario = new Vecindario(paramsV);
  vecindario.save().then(() => {
    res.status(200).json(paramsV);
  });
});
//listar vecindario
router.get("/neighborhood", (req, res, next) => {
  var paramsV = req.query;
  var SKIP = 0;
  var LIMIT = 10;
  var order = 1;
  var filter = {};
  if(paramsV.skip){
    SKIP = parseInt(paramsV.skip);
  }
  if(paramsV.limit){
    LIMIT = parseInt(paramsV.limit);
  }
  if(paramsV.order){
    order = parseInt(paramsV.order);
    console.log(order);
  }
  if(paramsV.nameNeighborhood){
    filter["nameNeighborhood"]= paramsV.nameNeighborhood;
  }
  if(paramsV.id){
    filter["_id"]= paramsV.id;
  }
  Vecindario.find(filter).skip(SKIP).limit(LIMIT).sort({nameNeighborhood: order}).exec((err, docs) => {
    if(err) {
      res.status(200).json({
        "msn":"error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});
//modificar 
/*router.patch("/neighborhood", (req, res, next) => {
  var paramsV = req.query;
  var data = req.body;
  if(paramsV.id == null){
    res.status(300).json({"msn":"faltan parametros"});
    return;
  }
  var objkey = Object.keysV(data);
  for(var i = 0; i < objkey.length; i++){
    if(!checkkey(objkey[i])){
      res.status(300).json({
        "msn":"tus parametros son incorrectos" + objkey[i]
      });
      return;
    };
  }
  Vecindario.update({_id: paramsV.id}, data).exec((err, docs) => {
    res.status(300).json(docs);
  });
});
function checkkey (key){
  for(var j = 0; j < KEYSV.length; j++){
      if(key == KEYSV[j]){
        return true;
      }
  }
  return false;
}
//eliminar Vecindario
router.delete("/neighborhood", (req, res, next) => {
  var paramsV = req.query;
  if(paramsV.id == null){
    res.status(300).json({"msn":"faltan parametros"});
    return;
  }
  Vecindario.remove({_id: params.id}, (err, docs) => {
    if(err){
      res.status(300).json({"msn":"no se elimino el registro"});
      return;
    }
    res.status(300).json(docs);
  })neighborhood
});*/
module.exports = router;
