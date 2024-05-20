var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const { response } = require('../app');


let tasks = [{
    'id':'1',
    'name':'Ganar el curso DAW',
    'description':'Obtener una nota aprobatoria del curso',
    'dueDate':'2024-05-20'
}];

const taskInit = mongoose.model('task',
    {name:String, description:String, dueDate:String},'tasks');

router.get('/getTasks', function(req, res, next){
    taskInit.find({}).then((response)=>
        res.status(200).json(response)).catch((err=>
            {res.status(500).json(err)}));
})

router.delete('/removeTask/:id', function(req, res, next){
    console.log(req.params.id);
    if(req.params && req.params.id){
        let id = req.params.id
        tasks = tasks.filter(task => task.id !== id);
        res.status(200).json(tasks)
    }else{
        res.json({})
    }
});

router.post('/addTasks', function(req, res, next){
    let timestamp = Date.now + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
       const task = new taskInit(req.body);
       task.save().then(
            () => res.status(200).json({})
       ).catch((err)=>res.status(500).json({}));
    }else{
        res.status(400).json({error:"entrada no valida"});
    }
})

router.delete('/removeTasks', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        tasks = tasks.filter( tasks => tasks.id !== id);
        res.json(tasks)
    }else{
        res.json([{}]);
    }
})

module.exports = router;