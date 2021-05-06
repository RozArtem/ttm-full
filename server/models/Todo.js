const { Schema, model, ObjectId } = require('mongoose')


const Todo = new Schema({

    name: { type: String, required: true, unique: true },
    descrition: { type: String},
    dateCreate: { type: String},
    dateUntil: { type: String},
    author: { type: ObjectId, ref: 'User' },
    project: { type: ObjectId, ref: 'Project' },
    status: {type: String}
})

module.exports = model('Todo', Todo)