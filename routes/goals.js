var express = require('express');
const goalsSchema = require ('../models/goals')
var router = express.Router();

router.get('/getGoals/', function(req, res, next){
  goalsSchema
        .find()
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
})

router.put('/putGoals/', function(req, res, next){
  const { id } = req.params;
  const { name, description, dueDate } = req.body;
  goalsSchema
        .updateOne({_id: id}, { $set: {name, description, dueDate}})
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
})

router.delete('/removeGoals/', function(req, res, next){
  const { id } = req.params;
  if(req.params && req.params.id){
  goalsSchema
        .remove({_id: id})
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
  }else{
    res.status(400).json({})
  }  
})


router.post('/addGoals', function(req, res, next){
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
      const goal = goalsSchema(req.body);
      goal
        .save()
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
    }else{
      res.status(400).json({error:"entrada no valida"});
  }
})


module.exports = router;