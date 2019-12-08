var express = require('express');
var Userobj = require("../../../../database/collections/user");
var KEYS = Userobj.keys;
var User =  Userobj.user;
var router = express.Router();
var crypto = require('crypto');
var jwt = require("jsonwebtoken");
var keycyfer = "password12345proyect";
function verifytoken(req, res, next){
  //recibir token
  const header = req.headers["authorization"];
  if(header == null){
    res.status(300).json({"msn":"No tiene permisos"});
    return;
  }
  req.token = header;
  jwt.verify(req.token, keycyfer, (err, authdata) => {
    if(err){
      res.status(403).json({"msn":"token incorrecto"});
      return;
    }
    var email = authdata.name;
    User.find({email: email}).exec((err, docs) => {
      if(err){
        res.status(300).json({"msn":"Error en la base de datos"});
        return;
      }
      if(docs[0].toJSON().rols[0] == "usuario"){
        next();
      }else{
        res.status(300).json({"msn":"Usted no tiene permisos"});
        return;
      }
    });
    //next()
    //res.status(300).json(authdata);
  });
}

//login
router.post("/login", verifytoken, (req, res, next) => {
  var params =  req.body;
  var passwordCifer = crypto.createHash("md5").update(params.password).digest("hex");
  User.find({email: params.email, password: passwordCifer }).exec((err, docs) => {
    if(err){
      res.status(300).json({"msn": "Problemas con la base de datos"});
      return;
    }
    if(docs.length == 0){
      res.status(300).json({"msn":"Usuario y Password incorrecto"});
      return;
    }else{
      //creacion del jsonwebtoken
      jwt.sign({name: params.email, password: passwordCifer}, keycyfer,(err, token) => {
        if(err){
          res.status(300).json({"msn": "Error con jsonwebtoken"});
          return;
        }
        res.status(200).json({"token": token});
        return;
      });
    }
  });
});
//create
router.post("/user", async(req, res, next) => {
  var params = req.body;
  var docs = await User.find({name: params.name, email: params.email});
  if(docs.length >= 1){
    res.status(300).json({
      "msn":"nombre de usuario o de correo incorrectos"
    });
    return;
  }
  params["rols"] = ["usuario"];
  if(params.password == null){
    res.status(300).json({
      "msn":"no tiene el password"
    });
    return;
  }
  //hash de password
  params ["password"] = crypto.createHash("md5").update(params.password).digest("hex");
  var user = new User(params);
  user.save().then(() => {
    res.status(200).json(params);
  });
});
//muestra usuarios
router.get("/user", verifytoken, (req, res, next) => {
  var params = req.query;
  var SKIP = 0;
  var LIMIT = 10;
  var order = 1;
  var filter = {};
  if(params.skip){
    SKIP = parseInt(params.skip);
  }
  if(params.limit){
    LIMIT = parseInt(params.limit);
  }
  if(params.order){
    order = parseInt(params.order);
    console.log(order);
  }
  if(params.name){
    filter["name"]= params.name;
  }
  if(params.id){
    filter["_id"]= params.id;
  }
  User.find(filter).skip(SKIP).limit(LIMIT).sort({name: order}).exec((err, docs) => {
    if(err) {
      res.status(200).json({
        "msn":"error en la base de datos"
      });
      return;
    }
    res.status(200).json(docs);
  });
});
//modificar usuarios
router.patch("/user", verifytoken, (req, res, next) => {
  var params = req.query;
  var data = req.body;
  if(params.id == null){
    res.status(300).json({"msn":"faltan parametros"});
    return;
  }
  var objkeys = Object.keys(data);
  for(var i = 0; i < objkeys.length; i++){
    if(!checkkeys(objkeys[i])){
      res.status(300).json({
        "msn":"tus parametros son incorrectos" + objkeys[i]
      });
      return;
    }; ap
  }
  User.update({_id: params.id}, data).exec((err, docs) => {
    res.status(300).json(docs);
  });
});
function checkkeys (key){
  for(var j = 0; j < KEYS.length; j++){
      if(key == KEYS[j]){
        return true;
      }
  }
  return false;
}
//eliminar usuario
router.delete("/user", verifytoken, (req, res, next) => {
  var params = req.query;
  if(params.id == null){
    res.status(300).json({"msn":"faltan parametros"});
    return;
  }
  User.remove({_id: params.id}, (err, docs) => {
    if(err){
      res.status(300).json({"msn":"no se elimino el registro"});
      return;
    }
    res.status(300).json(docs);
  })
});


module.exports = router;
