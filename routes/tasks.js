var express = require('express');
var router = express.Router();
const tasksSchema = require ('../models/tasks')
const { response } = require('../app');


router.get('/getTasks', function(req, res, next){
    goalsSchema
        .find()
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
})

router.delete('/removeTask/:id', function(req, res, next){
    const { id } = req.params;
    if(req.params && req.params.id){
        tasksSchema
        .remove({_id: id})
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
    }else{
        res.status(400).json({error:"entrada no valida"});
    }
});

router.post('/addTasks', function(req, res, next){
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        const task = tasksSchema(req.body);
        task
        .save()
        .then((data)=>res.status(200).json(data))
        .catch((error)=> res.status(500).json({ message: error}));
    }else{
        res.status(400).json({error:"entrada no valida"});
    }
})


module.exports = router;