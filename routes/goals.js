var express = require('express');
var router = express.Router();

let goals = [];

var mysql = require('mysql')

var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
})
connection.connect(function(err){
  if(err){
    console.error(err);
    return;
  }
  console.log('ID'+connection.threadId)
})


router.get('/getGoals', function(req, res, next){
    let queryCreateGoal='SELECT * FROM goals';
        connection.query(queryCreateGoal, function(err, results, fields){
            if(err){
              console.log(err);
              res.status(500).json(err)
              return;
            }else{
              console.log(results);
              res.status(200).json({results});
            }
          }); 
})

router.delete('/removeGoal/:id', function(req, res, next){
    console.log(req.params.id);
    if(req.params && req.params.id){
        let id = req.params.id
        let queryCreateGoal='DELETE FROM goals WHERE id="'+id+'"';
        connection.query(queryCreateGoal, function(err, results, fields){
            if(err){
              console.log(err);
              res.status(500).json(err)
              return;
            }else{
              console.log(results);
              res.status(200).json({});
            }
          }); 
    }else{
        res.status(400).json({})
    }
});

router.post('/addGoals', function(req, res, next){
    let timestamp = Date.now() + Math.random();
    if(req.body && req.body.name && req.body.description && req.body.dueDate){
        let queryCreateGoal='INSERT INTO goals(name, description, dueDAte) \
        VALUES("'+req.body.name+'", "'+req.body.description+'", "'+req.body.dueDate+'")';
        connection.query(queryCreateGoal, function(err, results, fields){
            if(err){
              console.log(err);
              res.status(500).json(err)
              return;
            }else{
              console.log(results);
              res.status(200).json({});
            }
          }); 
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