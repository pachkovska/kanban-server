const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

router.get('/', (req, res, next) => {
    console.log("GET request started executing")
    console.log(res);
    Task.find()
        .exec()
        .then(docs => {
            res.status(200).json({tasks: docs});
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/', (req, res) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        taskTitle: req.body.taskTitle,
        taskBody: req.body.taskBody,
        status: req.body.status ? req.body.status : "todo"
    });
    task.save()
        .then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /tasks'
    });
});

// router.get('/:taskId', (req, res) => {
//     const id = req.params.taskId;
//     if (id === 'special') {
//         res.status(200).json({
//             message: 'Handling GET requests to /tasks for a special ID'
//         });
//     } else {
//         res.status(200).json({
//             message: "Id was passed, but not found in Database"
//         })
//     }
// });

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    console.log(req.body)
    Task.updateOne({_id: id}, {
        $set: {
            taskTitle: req.body.taskTitle,
            taskBody: req.body.taskBody
        }
    })
        .exec()
        .then(docs => {
            res.status(200).json({tasks: docs});
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

router.post('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Handling GET requests to /tasks for a special ID'
        });
    } else {
        res.status(200).json({
            message: "Id was passed, but not found in Database"
        })
    }
});

router.delete('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    Task.deleteOne({_id: id})
        .exec()
        .then(docs => {
            res.status(200).json({tasks: docs});
        })
        .catch(err => {
            res.status(500).json(err);
        });

});

module.exports = router;