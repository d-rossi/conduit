const routeHandler = require('express').Router()
const User = require('../models/user')
const Follower = require('../models/follower')
const tokenExtractor = require('../utils/tokenExtractor')

routeHandler.use(tokenExtractor.verifyToken)

routeHandler.get('/', async (request, response) => {
    const { page, limit, count } = request.query;
    const pageNum = Math.max(1, parseInt(page) || 1);
    const limitNum = Math.max(1, parseInt(limit) || 10);
    const loggedInUserId = request.user.id

    const existingUser = await User.findById(loggedInUserId)
    if (!existingUser) {
        return response.status(404).json({ err: "User not found." })
    }

    if (count === 'true') {
        const totalFollowing = await Follower.countDocuments({ userId: loggedInUserId });
        return response.json({ count: totalFollowing });
    }

    const existingFollowing = await Follower.find({ userId: loggedInUserId }).populate('following', 'username').sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(parseInt(limitNum))
    return response.json(existingFollowing)
})
    
routeHandler.post('/:targetUserId', async (request, response) => {
    const {targetUserId} = request.params
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

    let newFollower = await new Follower({userId: loggedInUserId, following: targetUserId}).save()
    newFollower = await newFollower.populate('following', 'username')

    return response.status(201).json(newFollower)
})

routeHandler.delete('/:targetUserId', async (request, response) => {
    const {targetUserId} = request.params
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