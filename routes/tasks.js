const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

const db = mongojs(`mongodb://${process.env['BD_USER']}:${process.env['BD_PASSWORD']}@ds121674.mlab.com:21674/mytasklismean`, ['tasks'])

// get all tasks
router.get('/tasks', (req, res, next) => {
    db.tasks.find( (err, tasks) => {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

// get one task
router.get('/task/:id', (req, res, next) => {
    db.tasks.findOne( {_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// save task
router.post('/task', (req, res, next) => {
    var task = req.body;
    if(!task.title || (task.isDone + '')) {
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    } else {
        db.tasks.save(task, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        })
    }
});

// delete one task
router.delete('/task/:id', (req, res, next) => {
    db.tasks.remove( {_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});

// update one task
router.put('/task/:id', (req, res, next) => {
    const task = req.body;
    const updTask = {};

    if(task.isDone) {
        updTask.isDone = task.isDone;
    }
    if(task.title) {
        updTask.title = task.title;
    }
    if(!updTask){
        res.status(400);
        res.json({
            "error":"Bad Data"
        })
    } else {
        db.tasks.update( {_id: mongojs.ObjectId(req.params.id)}, (err, task) => {
            if(err){
                res.send(err);
            }
            res.json(task);
        });

    }
});


module.exports = router;
