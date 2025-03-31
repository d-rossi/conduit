const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send("<h1>HELLO WORLD from the conduit app!</h1>")
})

app.get('/articles', (request, response) => {
    const article = {id: "1", title: "title", userId: "u1"}
    //get from db

    //return
    response.json(article)
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})