const routeHandler = require('express').Router()
const Favorite = require('../models/favorite')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.use(tokenExtractor.verifyToken)
    
routeHandler.get('/', async (request, response) => {
    const { page = 1, limit = 10 } = request.query;
    const userId = request.user.id

    const favorites = await Favorite.find({userId}).populate('articleId').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))

    const articles = favorites.map(fav => ({
        ...fav.articleId.toJSON(),
        favoritedAt: fav.createdAt
    }))
    return response.json(articles)
})

module.exports = routeHandler