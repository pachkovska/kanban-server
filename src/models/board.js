const mongoose = require('mongoose');

const boardSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    boardName: String,
    boardTasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }],
});

module.exports = mongoose.model('Board', boardSchema);