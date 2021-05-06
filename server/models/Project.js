const { Schema, model, ObjectId } = require('mongoose')


const Project = new Schema({

    name: { type: String, required: true, unique: true },
    author: { type: ObjectId, ref: 'User' },
    items: [{ type: ObjectId, ref: 'Todo' }],
    status: {type: String}
})


module.exports = model('Project', Project)