const Project = require('../models/Project')
const Todo = require('../models/Todo')


class projectController {

    async addProject(req, res) {

        try {


            const { name, status } = req.body
            const project = new Project({ name: name, author: req.user.id, status })
            
            await project.save()
            return res.json(project)
        } catch (e) {

            console.log(e)
            return res.status(400).json(e)
        }
    }
    async getProjectsOne(req, res) {

        try {
            const userID = req.user.id
            const projectID = req.query.name
            const project = await Project.findOne({ author: userID, projectID })
           
            return res.json(project)

        } catch (e) {

            console.log(e)
            return res.status(500).json({ message: "Can not get project" })
        }
    }
    async getProjects(req, res) {

        try {
            const ID = req.user.id
            const project = await Project.find({ author: ID })
         
            return res.json(project)

        } catch (e) {

            console.log(e)
            return res.status(500).json({ message: "Can not get projects" })
        }
    }
    async deletProject(req, res) {

        try {

            const projectID = req.query.id
            const todos = Todo.find({ project: projectID, author: req.user.id })
            const project = Project.findOne({ _id: projectID, author: req.user.id })

            await todos.remove()
            await project.remove()
         
            return res.json({ message: 'Project has been deleted' })

        } catch (e) {

            console.log(e)
            return res.status(400).json(e)
        }
    }
    async editProject(req, res) {

        try {



            const { name, id, status } = req.body
            const filter = { _id: id, author: req.user.id };

            const project = await Project.findOneAndUpdate(filter, { $set: { name, status } })
         
            return res.json(project)

        } catch (e) {

            console.log(e)
            return res.status(400).json({ message: "Edit error" })
        }
    }

}


module.exports = new projectController()