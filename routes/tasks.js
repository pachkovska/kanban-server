const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Task = require('../models/task');

router.get('/', (req, res, next) => {
    console.log("GET request started executing")
    res.status(200).json({
        message: 'Handling GET requests to /tasks'
    });
});

router.post('/tasks', (req, res) => {
    const task = new Task({
        _id: new mongoose.Types.ObjectId(),
        taskTitle: req.body.taskTitle,
        taskBody: req.body.taskBody,
        status: req.body.status
    });
    task.save()
        .then(result => {
        console.log(result);
    }).catch(err => console.log(err));
    res.status(200).json({
        message: 'Handling POST requests to /tasks'
    });
});

router.get('/tasks:taskId', (req, res) => {
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

router.patch('/:taskId', (req, res, next) => {
    const id = req.params.taskId;
    if (id === 'special') {
        res.status(200).json({
            message: 'Updated task in database'
        });
    } else {
        res.status(200).json({
            message: "Patch request was sent for taskId that does not exist"
        })
    }
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
    if (id === 'special') {
        res.status(200).json({
            message: 'Updated task in database'
        });
    } else {
        res.status(200).json({
            message: "Patch request was sent for taskId that does not exist"
        })
    }
});

module.exports = router;