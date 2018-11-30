var express = require('express');
var router = express.Router();

/* GET users listing. */
//read
router.get('/', function(req, res, next) {
  //TODO:LOGICA NECESARIA PARA HACER QUE FUNCIONE EL READ
  res.json({data:"holas"});
});


//create
router.post('/',function(req,res,next){
  //TODO:LOGICA NECESARIA PARA HACER QUE FUNCIONE EL CREATE
  res.json(req.body);
})


//update
router.put('/',function(req,res,next){
  //TODO:LOGICA NECESARIA PARA HACER QUE FUNCIONE EL UPDATE
  res.json(req.body);
})

//delete
router.delete('/:id',function(req,res,next){
  //TODO:LOGICA NECESARIA PARA HACER QUE FUNCIONE EL DELETE
  res.json(req.body);
})


module.exports = router;
