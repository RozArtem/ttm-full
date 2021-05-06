const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const authRouter = require("./routes/auth.routes")
const todosRouter = require("./routes/todos.routes")
const projectRouter = require("./routes/project.routes")
const corsMiddleware = require("./middleware/cors.middleware")
const process = require('process');
const cors = require('cors');




const app = express()
const PORT =  process.env.PORT || config.get('serverPort')


app.use(cors());
app.use(express.json())
app.use("/api/auth", authRouter)
app.use("/api/project", projectRouter)
app.use("/api/todos", todosRouter)

const start = async () => {

    try {
        mongoose.set('useFindAndModify', false);
        mongoose.set('useCreateIndex', true)
        mongoose.connect(config.get('dbURL'), 
         { useNewUrlParser: true, useUnifiedTopology: true })
        app.listen(PORT, () => { console.log(`Server is running on ${PORT}`) })
    } catch (e) {

        console.log(e)
    }
}

start()