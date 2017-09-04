const express = require('express');
const router = express.Router();
const mongojs = require('mongojs');

console.log(process.env['BD_USER'])
console.log(process.env['BD_PASSWORD']);

const db = mongojs(`mongodb://${process.env['BD_USER']}:${process.env['BD_PASSWORD']}@ds121674.mlab.com:21674/mytasklismean`, ['tasks'])

router.get('/tasks', (req, res, next) => {
    db.tasks.find( (err, tasks) => {
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});

module.exports = router;
