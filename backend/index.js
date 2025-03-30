const express = require('express')
const app = express()

app.get('/', (request, response) => {
    response.send("<h1>HELLO WORLD from the conduit app!</h1>")
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`)
})