const mongoose = require('mongoose')

userSchema = new mongoose.Schema({
    username: String,
    passwordHash: String,
}, {timestamps:true})

userSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.passwordHash
    }
})

module.exports = mongoose.model('User', userSchema)