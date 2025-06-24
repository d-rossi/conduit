const routeHandler = require('express').Router()
const User = require('../models/user')
const Follower = require('../models/follower')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.use(tokenExtractor.verifyToken)
    
routeHandler.post('/:id/follow', async (request, response) => {
    const targetUserId = request.params.id
    const loggedInUserId = request.user.id

    if (loggedInUserId === targetUserId) {
        return response.status(400).json({ err: "You cannot follow yourself." })
    }

    const existingUser = await User.findById(targetUserId)
    if (!existingUser) {
        return response.status(404).json({ err: "User not found." })
    }

    const existingFollow = await Follower.findOne({ userId: loggedInUserId, following: targetUserId })

    if (existingFollow) {
        return response.status(409).json({ err: "You already follow this user." })
    }

    new Follower({userId: loggedInUserId, following: targetUserId}).save()

    return response.sendStatus(201)
})

module.exports = routeHandler