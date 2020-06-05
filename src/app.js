const express = require('express');
const app = express();
const serverless = require('serverless-http');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const taskRoutes = require('./routes/tasks');
const boardRoutes = require('./routes/boards');

mongoose.connect(
    "mongodb+srv://kanbanDBUser:booliKT2240@kanban-cluster-mvax5.mongodb.net",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)
    .then(() => console.log("mongo got connected"))
    .catch(err => console.log(err));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, GET, PATCH, POST, PUT',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Method', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    };
    next();
});

app.use('/.netlify/functions/app/tasks', taskRoutes);
app.use('/.netlify/functions/app/boards', boardRoutes);
app.use((req, res, next) => {
    const error = new Error('Not found');
    error.status = 404;
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
module.exports.handler = serverless(app);