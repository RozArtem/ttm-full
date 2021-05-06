
const Router = require("express");
const User = require("../models/User")
const bcrypt = require("bcryptjs")
const { check, validationResult } = require("express-validator")
const router = new Router()
const authMiddleware = require('../middleware/auth.middleware')
const jwt = require('jsonwebtoken')
const config = require('config')



router.post('/registration',
    [
        check('email', "Uncorrect email").isEmail(),
        check('password', 'Password must be longer than 3 and shorter than 12').isLength({ min: 3, max: 12 })
    ],
    async (req, res) => {
        try {
            console.log(req.body)
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ message: "Uncorrect request", errors })
            }

            const { email, password, name } = req.body;

            const candidate = await User.findOne({ email, name })

            if (candidate) {
                return res.status(400).json({ message: `User with email ${email} already exist` })
            }
            const hashPassword = await bcrypt.hash(password, 8)
            const user = new User({ email, password: hashPassword, name })
            await user.save()
          
            return res.json({ message: "User has been created" })

        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


router.post('/login',
    async (req, res) => {
        try {
            const { email, password } = req.body
            const user = await User.findOne({ email })
            if (!user) {
                return res.status(404).json({ message: "User not found" })
            }
            const isPassValid = bcrypt.compareSync(password, user.password)
            if (!isPassValid) {
                return res.status(400).json({ message: "Invalid password" })
            }
            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "1h" })
         
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    todos: user.todos,
                    project: user.project
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


router.get('/auth', authMiddleware,
    async (req, res) => {
        try {
            const user = await User.findOne({ _id: req.user.id })
            const token = jwt.sign({ id: user.id }, config.get("secretKey"), { expiresIn: "10h" })
           
            return res.json({
                token,
                user: {
                    id: user.id,
                    email: user.email,
                    name: user.name,
                    todos: user.todos,
                    project: user.project
                }
            })
        } catch (e) {
            console.log(e)
            res.send({ message: "Server error" })
        }
    })


module.exports = router