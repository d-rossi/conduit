const routeHandler = require('express').Router()
const Article = require('../models/article')

routeHandler.get('/', (request, response) => {
    const { page = 1, limit = 10, userId } = request.query;

    const filter = {};
    if (userId) filter.userId = userId;
    Article.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
           .then(data => response.json(data))
           .catch(err => console.log(err))
})
    
routeHandler.post('/', (request, response) => {
    const {title, userId, content, imgUrl} = request.body

    const filter = {};
    if (userId) filter.userId = userId;
    new Article({title, userId, content, imgUrl}).save()
                               .then(data => response.json(data))
                               .catch(err => console.log(err))
})

module.exports = routeHandler