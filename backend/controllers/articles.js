const routeHandler = require('express').Router()
const Article = require('../models/article')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.get('/', (request, response) => {
    const { page = 1, limit = 10, userId } = request.query;

    const filter = {};
    if (userId) filter.userId = userId;
    Article.find(filter).populate("userId", "username").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
           .then(data => response.json(data))
           .catch(err => console.log(err))
})

routeHandler.use(tokenExtractor.verifyToken)
    
routeHandler.post('/', (request, response) => {
    const {title, content, imgUrl} = request.body;
    const userId = request.user.id
    new Article({title, userId, content, imgUrl}).save()
                               .then(data => response.json(data))
                               .catch(err => console.log(err))
})

routeHandler.get('/:id', (request, response) => {
    const articleId = request.params.id
    Article.findById(articleId).populate("userId", "username").then(data => response.json(data)).catch(err => console.log(err))
})

module.exports = routeHandler