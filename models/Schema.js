const mongoose = require('mongoose')




const task = mongoose.model('tasks', {
    taskName: {
        type: String,
        required: true
    },
    taskStatus:
    {
        type: String,
        enum: ['true', 'false', 'end'],
        default: 'false',
    },
    taskDescription: {
        type: String
    },
    taskStarts: String,
    taskEnds: String
})


module.exports = task