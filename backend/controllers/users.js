const routeHandler = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const tokenExtractor = require('../utils/tokenExtractor')
const { request } = require('express')
const Article = require('../models/article')

routeHandler.post('/signup', async (request, response) => {
    const {username, email, password} = request.body
    if (await getExistingUserByUsernameOrEmail(username, email))  return response.status(400).json({error: 'Username or email already exists'})
    const passwordHash = await bcrypt.hash(password, 10)
    new User({username, email, passwordHash}).save()
                               .then(data => response.json(data))
                               .catch(err => console.log(err))
})

routeHandler.post('/login', async (request, response) => {
    const {username, password} = request.body
    const existingUser = await getExistingUserByUsername(username)
    const isPasswordCorrect = existingUser === null ? false : await bcrypt.compare(password, existingUser.passwordHash)
    if (!(existingUser && isPasswordCorrect)) {
       return response.status(404).json({error: 'Username or password is invalid!'})
    }

    const token = jwt.sign({username: username, id: existingUser._id}, process.env.SECRET, {expiresIn: "0.25h"})
    response.status(200).json({token, username: username})
})

routeHandler.use(tokenExtractor.verifyToken)

routeHandler.get('/', async (request, response) => {
    const username = request.user.username
    const existingUser = await getExistingUserByUsername(username)
    if (!existingUser) {
       return response.status(404).json({error: 'User not found!'})
    }
    return response.json(existingUser)
})

routeHandler.patch('/', async (request, response) => {
    const username = request.user.username
    const { email, description } = request.body;
    const updateFields = {};
    if (email != null) {
        updateFields.email = email; 
    }
    if (description != null) {
        updateFields.description = description;
    }
    const upatedUser = await User.findOneAndUpdate({ username: username}, { $set: updateFields }, { new: true })
    if (upatedUser) {
        response.status(200).send(upatedUser)
    } else {
        response.status(400).send({err: "The user was not found or you are unauthorized to update it"})
    }
})

routeHandler.delete('/', async (request, response) => {
    const userId = request.user.id
    await User.findByIdAndDelete(userId)
    await Article.deleteMany({ userId })
    response.sendStatus(204)
})

const getExistingUserByUsernameOrEmail = async (username, email) => {
    return await User.findOne({ $or: [{ username }, { email }] })
}

const getExistingUserByUsername = async (username) => {
    return await User.findOne({ username })
}

module.exports = routeHandler