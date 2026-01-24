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
        const totalFollowers = await Follower.countDocuments({ following: loggedInUserId });
        return response.json({ count: totalFollowers });
    }

    const existingFollowers = await Follower.find({ following: loggedInUserId }).populate('userId', 'username').sort({ createdAt: -1 }).skip((pageNum - 1) * limitNum).limit(parseInt(limitNum))
    return response.json(existingFollowers)
})

module.exports = routeHandler