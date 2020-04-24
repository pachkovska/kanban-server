const express = require('express');
const app = express();
const morgan = require('morgan');

const tasksRoutes = require('./routes/tasks');

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    if(req.method === "OPTIONS") {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
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