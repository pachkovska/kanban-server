const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');

const tasksRoutes = require('./routes/tasks');

mongoose.connect(
    "mongodb+srv://kanbanDBUser:booliKT2240@kanban-cluster-mvax5.mongodb.net/test?retryWrites=true&w=majority",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("mongo got connected"))
    .catch(err => console.log(err));

app.use(morgan('dev'));

app.use((req, res, next) => {
    console.log("header stuff is getting executed")
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
        console.log(req)
        return res.status(200).json({});
    }
});

app.use('/tasks', tasksRoutes);
// app.use('/boards', boardsRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status(404);
    next(error)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
});

module.exports = app;