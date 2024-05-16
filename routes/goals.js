var express = require('express');
var router = express.Router();

let goals = [];

router.get('/getGoals', function(req, res, next){
    res.json(goals);
})

router.delete('/removeGoal/:id', function(req, res, next){
    console.log(req.params.id);
    if(req.params && req.params.id){
        let id = req.params.id
        goals = goals.filter(goal => goal.id !== id);
        res.status(200).json(goals)
    }else{
        res.json({})
    }
});

router.post('/addGoals', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        req.body.id = timestamp.toString();
        goals.push(req.body);
        res.status(200).json(goals);
    }else{
    res.status(400).json({error : "entrada no valida"});
    }
})

router.delete('/removeGoals', function(req, res, next){
    if(req.params && req.params.id){
        let id = req.params.id;
        goals = goals.filter( goals => goals.id !== id);
        res.json(goals)
    }else{
        res.json([{}]);
    }
})

module.exports = router;