const routeHandler = require('express').Router()
const User = require('../models/user')
const Follower = require('../models/follower')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.use(tokenExtractor.verifyToken)

routeHandler.get('/:id/followers', async (request, response) => {
    const { page, limit, count } = request.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const targetUserId = request.params.id

    const existingUser = await User.findById(targetUserId)
    if (!existingUser) {
        return response.status(404).json({ err: "User not found." })
    }

    if (count === 'true') {
        const totalFollowers = await Follower.countDocuments({ following: targetUserId });
        return response.json({ count: totalFollowers });
    }

    const existingFollowers = await Follower.find({ following: targetUserId }).populate('userId', 'username').sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(parseInt(limitNum))
    return response.json(existingFollowers)
})
    
routeHandler.post('/:id/followers', async (request, response) => {
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

routeHandler.delete('/:id/followers', async (request, response) => {
    const targetUserId = request.params.id
    const loggedInUserId = request.user.id

    if (loggedInUserId === targetUserId) {
        return response.status(400).json({ err: "You cannot unfollow yourself." })
    }

    const existingUser = await User.findById(targetUserId)
    if (!existingUser) {
        return response.status(404).json({ err: "User not found." })
    }

    const { deletedCount } = await Follower.deleteOne({ userId: loggedInUserId, following: targetUserId })
    
    if (!deletedCount) {
        return response.status(400).send({err: "You cannot unfollow someone that you are not following."})
    } 
    return response.sendStatus(204)
})

module.exports = routeHandler