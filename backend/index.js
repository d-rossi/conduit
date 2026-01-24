const express = require('express')
const app = express()
const config = require('./config')
const cors = require('cors')
const articlesRouter = require('./controllers/articles')
const usersRouter = require('./controllers/users')
const favoritesRouter = require('./controllers/favorites')
const commentsRouter = require('./controllers/comments')
const followersRouter = require('./controllers/followers')
const followingRouter = require('./controllers/following')
const errorHandler = require('./utils/errorHandler')

config.connectToDB()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

app.use('/articles', commentsRouter)
app.use('/articles', articlesRouter)
app.use('/users', usersRouter)
app.use('/followers', followersRouter) 
app.use('/following', followingRouter)
app.use('/favorites', favoritesRouter)

app.use(errorHandler.unknownEndpoint)

const PORT = process.env.MONGODB_PORT || 3001
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})