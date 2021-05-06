const Todo = require('../models/Todo')



class TodoController {

    async addTodo(req, res) {

        try {
            const item = req.body

            if (item.dateUntil) {
                const dateArr = item.dateUntil.split('T')
                const dateMDY = new Date(dateArr[0]).toLocaleDateString()
                const newDateUntil = `${dateMDY} ${dateArr[1]}`

                item.dateUntil = newDateUntil
            }

            const newDate = new Date().toLocaleDateString()
            const newTimeHours = new Date().getHours()
            const newTimeMinutes = new Date().getMinutes()

            const newDateAndTime = `${newDate} ${newTimeHours}:${newTimeMinutes}`
            
            item.dateCreate = newDateAndTime

            const todo = new Todo({ ...item, author: req.user.id })
            await todo.save()
           
            return res.json(todo)

        } catch (e) {

            console.log(e)
            return res.status(400).json({ message: "Can not add new todo" })
        }
    }
    async getTodos(req, res) {

        try {

            const ID = req.user.id
            const Project = req.query.id
            const todos = await Todo.find({ author: ID})

         
            return res.json(todos)

        } catch (e) {

            console.log(e)
            return res.status(500).json({ message: "Can not get todos" })
        }
    }
    async getOneTodo(req, res) {

        try {

            const ID = req.user.id
            const todoID = req.query.id
            const todo = await Todo.findOne({ author: ID, _id: todoID })

            return res.json(todo)

        } catch (e) {

            console.log(e)
            return res.status(500).json({ message: "Can not get todos" })
        }
    }
    async deletTodo(req, res) {

        try {

            const todoID = req.query.id
            const todo = await Todo.findOne({ _id: todoID, author: req.user.id })
            await todo.remove()
         
            return res.json({ message: 'Todo has been deleted' })

        } catch (e) {

            console.log(e)
            return res.status(400).json(e)
        }
    }
    async editTodo(req, res) {

        try {

            const item = req.body
            const itemID = req.query.id

            if (item.dateUntil) {
                const dateArr = item.dateUntil.split('T')
                const dateMDY = new Date(dateArr[0]).toLocaleDateString()
                const newDateUntil = `${dateMDY} ${dateArr[1]}`

                item.dateUntil = newDateUntil
            }
            
            const todo = await Todo.findByIdAndUpdate(itemID,
                {
                    $set:
                    {
                        name: item.name,
                        descrition: item.descrition,
                        dateUntil: item.dateUntil,
                        status: item.status
                    }
                },
                {
                    new: true,
                    upsert: true
                })
                
            console.log(todo)
            return res.json(todo)

        } catch (e) {

            console.log(e)
            return res.status(400).json({ message: "Edit error" })
        }
    }
    async editTodoStatus(req, res) {

        try {

            const newStatus = req.body
            const itemID = req.query.id

            console.log(newStatus.status)
            const todo = await Todo.findByIdAndUpdate(itemID,
                {
                    $set:
                    {
                      
                        status: newStatus.status
                    }
                },
                {
                    new: true,
                    upsert: true
                })
                
            console.log(todo)
            return res.json(todo)

        } catch (e) {

            console.log(e)
            return res.status(400).json({ message: "Change error" })
        }
    }

}


module.exports = new TodoController()