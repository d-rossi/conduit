const routeHandler = require('express').Router()
const Article = require('../models/article')
const Comment = require('../models/comment')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.get('/:id/comments', async (request, response) => {
  const { page = 1, limit = 10 } = request.query;
  const articleId = request.params.id

  const existingArticle = await Article.findById(articleId)

  if(!existingArticle){
    return response.status(404).send({err: "Article not found."})
  }

  const comments = await Comment.find({ articleId }).populate('userId', 'username').sort({ createdAt: -1 }).skip((page - 1) * limit).limit(parseInt(limit))
  return response.json(comments)
})

routeHandler.post('/:id/comments', tokenExtractor.verifyToken, async (request, response) => {
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