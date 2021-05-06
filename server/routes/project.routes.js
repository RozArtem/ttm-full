const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const projectController = require('../controllers/projectController')


router.post('', authMiddleware, projectController.addProject)
router.post('/edit', authMiddleware, projectController.editProject)
router.delete('', authMiddleware, projectController.deletProject)
router.get('', authMiddleware, projectController.getProjects)
router.get('/:id', authMiddleware, projectController.getProjectsOne)



module.exports = router