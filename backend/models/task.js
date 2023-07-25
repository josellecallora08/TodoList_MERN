const mongoose = require('mongoose');

const TaskModel = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    Description:{
        type: String,
        required: true
    },
    Status:{
        type: Boolean,
        default: false
    },
    UserID:{
        type:String,
        required: true
    }
}, {timestamps: true})

module.exports = mongoose.model("Task", TaskModel)