const mongoose = require('mongoose')

const goalsSchema = mongoose.Schema({
    id: {
    type: Number,
    required: true
    },
    name: {
    type: String,
    required: true
    },
    description: {
    type: String,
    required: true
    },
    dueDate: {
    type: String,
    required: true
    }

});

module.exports = mongoose.model('goals', goalsSchema)
