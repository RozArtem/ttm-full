const { Schema, model, ObjectId } = require('mongoose')


const User = new Schema({

    name: { type: String, required: true, unique: true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    todos: [{ type: ObjectId, ref: 'Todo' }],
    project: [{ type: ObjectId, ref: 'Project' }]
})


module.exports = model('User', User)