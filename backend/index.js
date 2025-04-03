const express = require('express')
const app = express()
const config = require('./config')
const Article = require('./models/article')

config.connectToDB()

app.get('/', (request, response) => {
    response.send("<h1>HELLO WORLD from the conduit app!</h1>")
})

app.get('/articles', (request, response) => {
    const { page = 1, limit = 10, userId } = request.query;

    const filter = {};
    if (userId) filter.userId = userId;
    Article.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
           .then(data => response.json(data))
           .catch(err => console.log(err))
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})