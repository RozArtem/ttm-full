const Router = require('express')
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const todoController = require('../controllers/todosController')


router.post('/', authMiddleware, todoController.addTodo)
router.post('/edit', authMiddleware, todoController.editTodo)
router.put('/edit', authMiddleware, todoController.editTodoStatus)
router.delete('', authMiddleware, todoController.deletTodo)
router.get('/', authMiddleware, todoController.getTodos)
router.get('/:id', authMiddleware, todoController.getOneTodo)



module.exports = router