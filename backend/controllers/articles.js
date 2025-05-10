const routeHandler = require('express').Router()
const Article = require('../models/article')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.use(tokenExtractor.verifyToken)

routeHandler.get('/', (request, response) => {
    const { page = 1, limit = 10, userId } = request.query;

    const filter = {};
    if (userId) filter.userId = userId;
    Article.find(filter).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
           .then(data => response.json(data))
           .catch(err => console.log(err))
})
    
routeHandler.post('/', (request, response) => {
    const {title, content, imgUrl} = request.body;
    const userId = request.user.id
    new Article({title, userId, content, imgUrl}).save()
                               .then(data => response.json(data))
                               .catch(err => console.log(err))
})

module.exports = routeHandler