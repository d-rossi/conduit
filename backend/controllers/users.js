const routeHandler = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

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

const getExistingUserByUsernameOrEmail = async (username, email) => {
    return await User.findOne({ $or: [{ username }, { email }] })
}

const getExistingUserByUsername = async (username) => {
    return await User.findOne({ username })
}

module.exports = routeHandler