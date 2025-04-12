const express = require('express')
const app = express()
const config = require('./config')
const Article = require('./models/article')
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const usersRouter = require('./controllers/users')
const errorHandler = require('./utils/errorHandler')

config.connectToDB()

app.use(cors())
// app.use(express.static('dist'))

app.use('/articles', articlesRouter)
app.use('/users', usersRouter)

app.use(errorHandler.unknownEndpoint)

const PORT = process.env.MONGODB_PORT || 3001
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})