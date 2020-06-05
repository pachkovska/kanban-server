const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    taskTitle: String,
    taskBody: String,
    status: String,
    board: {type: mongoose.Schema.Types.ObjectId, ref: 'Board'}
});

module.exports = mongoose.model('Task', taskSchema);