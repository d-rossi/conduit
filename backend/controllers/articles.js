const routeHandler = require('express').Router()
const Article = require('../models/article')
const Favorite = require('../models/favorite')
const Comment = require('../models/comment')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.get('/', (request, response) => {
    const { page = 1, limit = 10, userId } = request.query;

    const filter = {};
    if (userId) filter.userId = userId;
    Article.find(filter).populate("userId", "username").sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
           .then(data => response.json(data))
           .catch(err => console.log(err))
})

routeHandler.get('/:id', (request, response) => {
    const articleId = request.params.id
    Article.findById(articleId).populate("userId", "username").then(data => response.json(data)).catch(err => console.log(err))
})

routeHandler.use(tokenExtractor.verifyToken)
    
routeHandler.post('/', (request, response) => {
    const {title, content, imgUrl} = request.body;
    const userId = request.user.id
    new Article({title, userId, content, imgUrl}).save()
                               .then(data => response.json(data))
                               .catch(err => console.log(err))
})

routeHandler.delete('/:id', async (request, response) => {
   const userIdOfRequest = request.user.id
   const articleId = request.params.id
  const { deletedCount } = await Article.deleteOne({ _id: articleId, userId: userIdOfRequest })
   if (deletedCount) {
    response.sendStatus(204)
   } else {
     response.status(400).send({err: "The article was not found or you are unauthorized to delete it"})
   }
})

routeHandler.patch('/:id', async (request, response) => {
  const { content } = request.body
  const articleId = request.params.id
  const userIdOfRequest = request.user.id
  const updatedArticle = await Article.findOneAndUpdate({ _id: articleId, userId: userIdOfRequest }, { content }, { new: true })
  if (updatedArticle) {
    response.status(200).send(updatedArticle)
  } else {
    response.status(400).send({err: "The article was not found or you are unauthorized to update it"})
  }
})

routeHandler.delete('/', async (request, response) => {
  const userIdOfRequest = request.user.id
  await Article.deleteMany({ userId: userIdOfRequest })
  response.sendStatus(204)
})

//----------------------------------FAVORITE--------------------------------------------
routeHandler.post('/:id/favorite', async (request, response) => {
  const articleId = request.params.id
  const userId = request.user.id

  const existingArticle = await Article.findById(articleId)

  if(!existingArticle){
    return response.status(404).send({err: "Article not found."})
  }

  if (userId === existingArticle.userId.toString()) {
    return response.status(403).send({err: "You cannot favorite an article that you have written!"})
  }
  
  const alreadyFavorited = await Favorite.findOne({ userId, articleId });
  if (alreadyFavorited) {
    return response.status(409).send({ err: "Article already favorited." });
  }

  await new Favorite({userId, articleId}).save()
  return response.sendStatus(201)
})

routeHandler.delete('/:id/favorite', async (request, response) => {
  const articleId = request.params.id
  const userId = request.user.id

  const { deletedCount } = await Favorite.deleteOne({ articleId, userId })

  if (deletedCount) {
    return response.sendStatus(204)
  }
  return response.status(400).send({err: "You cannot unfavorite an article you have not previously favorited!"})
})

//----------------------------------COMMENTS--------------------------------------------
routeHandler.post('/:id/comments', async (request, response) => {
  const articleId = request.params.id
  const userId = request.user.id
  const { text } = request.body
  
  if (!text || text.trim().length === 0) {
    return response.status(400).send({ err: "Comment text is required." });
  }

  const existingArticle = await Article.findById(articleId)

  if(!existingArticle){
    return response.status(404).send({err: "Article not found."})
  }

  const createdComment = await new Comment({userId, articleId, text}).save()
  return response.json(createdComment)
})

module.exports = routeHandler