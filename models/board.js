const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    boardName: String,
    boardTasks: [],
});

module.exports = mongoose.model('Task', taskSchema);