const mongoose = require('mongoose')

const followerSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  following: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true })

followerSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('Follower', followerSchema)